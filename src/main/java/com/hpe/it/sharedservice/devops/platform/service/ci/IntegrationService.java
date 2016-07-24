package com.hpe.it.sharedservice.devops.platform.service.ci;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.internal.StringMap;
import com.hpe.it.sharedservice.devops.platform.dao.IntegrationRecordDao;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.IntegrationRecord;
import com.hpe.it.sharedservice.devops.platform.model.IntegrationStatus;
import com.hpe.it.sharedservice.devops.platform.model.Measure;
import com.hpe.it.sharedservice.devops.platform.model.MeasureCondition;
import com.hpe.it.sharedservice.devops.platform.model.MeasureGroup;
import com.hpe.it.sharedservice.devops.platform.model.MetricPeriod;
import com.hpe.it.sharedservice.devops.platform.model.QualityGate;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;
import com.hpe.it.sharedservice.devops.platform.service.DevOpsProjectService;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;
import com.hpe.it.sharedservice.devops.platform.service.SonarQubeService;
import com.hpe.it.sharedservice.devops.platform.utils.Constants;
import com.hpe.it.sharedservice.devops.platform.utils.ResultUtil;
import com.hpe.it.sharedservice.devops.platform.utils.ThreadPoolMgr;
import com.hpe.it.sharedservice.devops.platform.utils.TimeUtil;
import com.mongodb.BasicDBObject;

@Service
public class IntegrationService {
	private static Log LOG = LogFactory.getLog(IntegrationService.class);
	@Autowired
	private JenkinsService jenkinsService;
	@Autowired
	private SonarQubeService sonarQubeService;
	@Autowired
	private DevOpsProjectService devOpsProjectService;
	
	@Autowired
	private IntegrationRecordDao integrationRecordDao;
	/**
	 * start integration process
	 * @param app
	 * @return
	 */
	public Result integrate(final String projectId,final DevOpsApplication app){
		//jenkins 
		Result jenkinsBuild = jenkinsService.queryBuildInfo(app.getApplicationName());
		Result launchBuild = jenkinsService.launchBuild(app.getApplicationName());
		if(!Result.Status.SUCCESS.equals(launchBuild.getStatus())){
		    return launchBuild;	
		}
		final Gson gson = new Gson();
		BasicDBObject jobInfo = gson.fromJson(jenkinsBuild.getResultData().toString(), BasicDBObject.class);
		//Object tmp = jobInfo.get("lastBuild");
		@SuppressWarnings("unchecked")
		StringMap<Object> lastBuild = (StringMap<Object>) jobInfo.get("lastBuild");
		
		//append record into mongodb
		int latestBuildNum = 0;
		if(lastBuild!=null){
			latestBuildNum = (int) Double.parseDouble(lastBuild.get("number").toString());
		}
        final int  curBuildBum = latestBuildNum+1;
		long buildId=integrationRecordDao.countRecordByAppId(app.get_id());
		final IntegrationRecord newRecord = new IntegrationRecord(curBuildBum,app.get_id(),projectId,buildId,app.getScm().getRepoUrl());
		newRecord.setStartUTC(TimeUtil.formatUTCTime());
		if(integrationRecordDao.addIntegrationRecord(newRecord)){
			ThreadPoolMgr.getPool().execute(new Runnable() {
				@Override
				public void run() {
					while(true){
						try {
							Thread.sleep(5000);
						} catch (InterruptedException e) {
							LOG.error("can not sleep",e);
						}
						Result result = jenkinsService.queryBuildResult(app.getApplicationName(), curBuildBum);	
						if(Status.SUCCESS.equals(result.getStatus())){
							//Gson gson = new Gson();
							BasicDBObject build= gson.fromJson(result.getResultData().toString(), BasicDBObject.class);
							String tmpStatus ="";
							if(build.get("building")==null||(Boolean) build.get("building")){
								tmpStatus="SPINNING";
							}else{
								tmpStatus=build.get("result").toString();
							}
							IntegrationStatus status = Enum.valueOf(IntegrationStatus.class, tmpStatus);
							LOG.debug("jenkins status:"+status);
							if(IntegrationStatus.SPINNING.equals(status)){
								continue;
							}else{
								LOG.debug("updating integration record");
								Result sonar = sonarQubeService.fetchSonarQubeMetricReport(app.getApplicationName(), Constants.SONARQUBE_METRICS);
								@SuppressWarnings({ "unchecked", "rawtypes" })
								List measures = ((StringMap<List>)gson.fromJson(sonar.getResultData().toString(), BasicDBObject.class).get("component")).get("measures");
								List<Measure> allMeasures=new ArrayList<Measure>(measures.size());
								Measure   quality_gate_details =null;
								for (Object measure : measures) {
									@SuppressWarnings("unchecked")
									StringMap<Object> strMapMeasure = (StringMap<Object>)measure;	
									Measure meObj= new Measure();
									meObj.setMetric(strMapMeasure.get("metric").toString());
									meObj.setValue((String)strMapMeasure.get("value"));
									@SuppressWarnings("unchecked")
									List<StringMap<Object>> periods = (List<StringMap<Object>>)strMapMeasure.get("periods");
									if(periods!=null){
									    List<MetricPeriod> periodsObj = new ArrayList<MetricPeriod>();
										for (StringMap<Object> period : periods) {
											int index = Double.valueOf(period.get("index").toString()).intValue();
											String value = period.get("value").toString();
											periodsObj.add(new MetricPeriod(index, value));
										}
										meObj.setPeriods(periodsObj);
									}
									if("quality_gate_details".equals(meObj.getMetric())){
										quality_gate_details = meObj;
									}else{
										allMeasures.add(meObj);
									}
									
								}
								Map<String,Object> measureGrp = distributeMeasure(allMeasures, quality_gate_details);
								measureGrp.put("build", detectJenkinsBuildResult(build));
								//StringMap<Object> sonarObj = (StringMap<Object>) gson.fromJson(sonar.getResultData().toString(), BasicDBObject.class).get("measures");
								if(IntegrationStatus.SUCCESS.equals(status)){
									Map<String, String> jenkinsLog= jenkinsService.jenkinsBuildConsoleAnalysis(app.getApplicationName(), newRecord.getJenkinsId());
									newRecord.setImageName(jenkinsLog.get(Constants.JENKINS_BUILD_CONSOLE_KEY_WORDS_DOCKER_IMAGE));
								}
								newRecord.setStatus(estimateTotalStatus(measureGrp));
								newRecord.setResult(measureGrp);
								newRecord.setEndUTC(TimeUtil.formatUTCTime());
								integrationRecordDao.updateRecord(newRecord);
								//devOpsProjectService.updateIntegrationRecord(projectId, app.get_id(), measureGrp, latestBuildNum+1,status);
								break;
							}
						}
					}
					
				}
			});
		}
		Result result = new Result();
		result.setStatus(Status.SUCCESS);
		result.setResultData(newRecord);
		return result;
	}
	private IntegrationStatus estimateTotalStatus(Map<String,Object> measureGrp){
		Result.Status code_review = ((MeasureGroup)measureGrp.get("code_review")).getStatus();
		Result.Status security_test = ((MeasureGroup)measureGrp.get("security_test")).getStatus();
		Result.Status unit_test = ((MeasureGroup)measureGrp.get("unit_test")).getStatus();
		@SuppressWarnings("unchecked")
		String build = ((Map<String, Object>)measureGrp.get("build")).get("status").toString();
		if(Result.Status.SUCCESS.equals(code_review)
				&&Result.Status.SUCCESS.equals(security_test)
				&&Result.Status.SUCCESS.equals(unit_test)
				&&build.equals("SUCCESS")) {
			return IntegrationStatus.SUCCESS;
		}else if(Result.Status.ERROR.equals(code_review)
				||Result.Status.ERROR.equals(security_test)
				||Result.Status.ERROR.equals(unit_test)
				||build.equals("FAILURE")){
			return IntegrationStatus.FAILURE;
		}else{
			return IntegrationStatus.UNSTABLE;
		}
	}
	private Map<String, Object> detectJenkinsBuildResult(BasicDBObject build){
		Map<String, Object> buildResult = new HashMap<String, Object>();
		buildResult.put("status", build.get("result"));
		@SuppressWarnings("unchecked")
		List<StringMap<Object>> jenkinsActions =  (List<StringMap<Object>>)build.get("actions");
		String branch=null;
		String sha=null;
		for (StringMap<Object> action : jenkinsActions) {
			if(action.get("buildsByBranchName")!=null){
				@SuppressWarnings("unchecked")
				List<StringMap<String>> branches = ((StringMap<StringMap<StringMap<List<StringMap<String>>>>>)action.get("buildsByBranchName")).get("refs/remotes/origin/master").get("marked").get("branch");
				if(branches==null||branches.size()==0){
					break;
				}else{
					branch = branches.get(0).get("name");
					sha = branches.get(0).get("SHA1");
				}
				break;
			}
		}
		buildResult.put("branch", branch);
		buildResult.put("sha",sha );
		buildResult.put("buildDetail", build);
		return buildResult;
		
	}
	
	private Map<String,Object> distributeMeasure(List<Measure> measures,Measure qualityGateDetail){
		if(qualityGateDetail!=null){
		Gson gson = new Gson();
		QualityGate qualityGate = gson.fromJson(qualityGateDetail.getValue(), QualityGate.class);
			for (Measure measure : measures) {
				MeasureCondition condition = findCondition(qualityGate.getConditions(), measure.getMetric());
				measure.setCondition(condition);
			}
		}
		Map<String,Object> measureGrp = new HashMap<String, Object>();
		
		measureGrp.put("code_review", filterMeasureByMetrics(measures, Constants.CODE_REVIEW_METRICS,"code_review"));
		
		measureGrp.put("security_test", filterMeasureByMetrics(measures, Constants.SECURITY_METRICS,"security_test"));
		
		measureGrp.put("unit_test", filterMeasureByMetrics(measures, Constants.UNIT_TEST_METRICS,"unit_test"));
		
		return measureGrp;
	}
	
	private MeasureGroup filterMeasureByMetrics(List<Measure> measures,List<String> metrics,String grpName){
		MeasureGroup grp = new MeasureGroup();
		grp.setGroupName(grpName);
		List<Measure> newMeasures = new ArrayList<Measure>(metrics.size());
		Result.Status level=Result.Status.SUCCESS;
		for (String metric : metrics) {
			for (Measure measure : measures) {
				if(measure.getMetric().equals(metric)){
					newMeasures.add(measure);
					if(measure.getCondition()!=null){
						if(measure.getCondition().getLevel().equals("ERROR")){
							level=Result.Status.ERROR;
						}
					}
				}
			}
		}
		grp.setStatus(level);
		grp.setMeasures(newMeasures);
		return grp;
		
	}
		
	private MeasureCondition findCondition(List<MeasureCondition> conditions,String metric){
		for (MeasureCondition measureCondition : conditions) {
			if(metric.equals(measureCondition.getMetric())){
				return measureCondition;
			}
		}
		return null;
	}
	
	public Result queryAllBuildInfo(String jobName){
		
		return jenkinsService.queryBuildInfo(jobName);
	}
	
	public Result queryBuildResult(String jobName, int buildId){
		Map<String, Result> allResult = new HashMap<String, Result>();
		allResult.put("sonar", sonarQubeService.fetchSonarQubeMetricReport(jobName, Constants.SONARQUBE_METRICS));
		allResult.put("build", jenkinsService.queryBuildResult(jobName, buildId));
		return ResultUtil.combineResults(allResult);
	}
	
	public String getJenkinsHost(){
		return jenkinsService.getJenkinsHost();
	}
	
	public Result getBuildConsole(String jobName, int buildId){
		return jenkinsService.getBuildConsoleInfo(jobName, buildId);
	}
	
	public Result getIntegrationRecordsByApp(String appId){
		List<IntegrationRecord> records = integrationRecordDao.getRecordsByAppId(appId);
		Result result = new Result(Status.SUCCESS);
		result.setResultData(records);
		return result;
	}
	
	public Result getIntegrationRecordsByProject(List<String> projectId){
		List<IntegrationRecord> records = integrationRecordDao.getRecordsByAppIdGrp(projectId);
		Result result = new Result(Status.SUCCESS);
		result.setResultData(records);
		return result;
	}
	
	public Result getIntegrationRecorByRecordId(String id){
		Result result = new Result();
		IntegrationRecord record = integrationRecordDao.getRecordById(id);
		if(record==null){
			result.setStatus(Status.ERROR);
			result.setMsg("Can no find record which record id is:"+id);
		}else{
			result.setResultData(record);
			result.setStatus(Status.SUCCESS);
		}
		return result;
	}
}
