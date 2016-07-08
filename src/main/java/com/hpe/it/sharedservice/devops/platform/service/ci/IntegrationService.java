package com.hpe.it.sharedservice.devops.platform.service.ci;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;
import com.hpe.it.sharedservice.devops.platform.service.SonarQubeService;
import com.hpe.it.sharedservice.devops.platform.utils.Constants;
import com.hpe.it.sharedservice.devops.platform.utils.ResultUtil;

@Service
public class IntegrationService {
	@Autowired
	private JenkinsService jenkinsService;
	@Autowired
	private SonarQubeService sonarQubeService;
	
	/**
	 * start integration process
	 * @param app
	 * @return
	 */
	public Result integrate(DevOpsApplication app){
		//jenkins 
		Result jenkinsBuild = jenkinsService.launchBuild(app.getApplicationName());
		//TO-DO actane ALM
		return jenkinsBuild;
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
}
