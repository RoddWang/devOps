package com.hpe.it.sharedservice.devops.platform.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.client.JenkinsClient;
import nl.tudelft.jenkins.guice.JenkinsWsClientGuiceModule;
import nl.tudelft.jenkins.jobs.GitScmConfig;
import nl.tudelft.jenkins.jobs.Job;
import nl.tudelft.jenkins.jobs.SVNScmConfig;
import nl.tudelft.jenkins.jobs.ScmConfig;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.hpe.it.sharedservice.devops.platform.jenkins.JenkinsClientPlusImpl;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;

@Service
public class JenkinsService {
	private static Log LOG = LogFactory.getLog(JenkinsService.class);
	private static String defaultJenkinsUser = "commonUser";
	private static String defaultJenkinsPass = "1qaz@WSX";
	private static String jenkinsUrl = "http://localhost:8080/";
	private static JenkinsClient client = null;

	
	static{
		Injector injector = null;
		try {
			injector = Guice.createInjector(new JenkinsWsClientGuiceModule(
					new URL(jenkinsUrl), defaultJenkinsUser,
					defaultJenkinsPass));
			client = (JenkinsClient) injector.getInstance(JenkinsClientPlusImpl.class);
		} catch (MalformedURLException e) {
			LOG.fatal("Can not find jenkins", e);
		}
	}
	public String getJenkinsHost(){
		return jenkinsUrl;
	}
	public Job createJob(DevOpsApplication app, List<User> owners)
			throws MalformedURLException {
		ScmConfig scmConfig = null;
		switch (app.getScm().getScmType()) {
		case GIT:
			scmConfig = new GitScmConfig(app.getScm().getRepoUrl());
			break;
		case SVN:
			scmConfig = new SVNScmConfig(app.getScm().getRepoUrl());
			break;
		default:
			break;
		}

		final Job job = client.createJob(app.getApplicationName(), scmConfig,
				owners);
		return job;
	}

	/**
	 * retirieve job from jenkins
	 * 
	 * @return
	 */
	public void retrieveJob(DevOpsApplication service) {
		client.retrieveJob(service.getApplicationName());
	}
	
	/**
	 * launch the build 
	 * @param jobName
	 * @return
	 */
	public Result launchBuild(String jobName){
		return jenkinsGetApi(jobName, "/build?delay=0sec", 201);
	}
	
	/**
	 * request http://{jenkinshost}/job/{jobName}/api/json to get build infomation 
	 * @param jobName
	 * @return
	 */
	public Result queryBuildInfo(String jobName){
		return jenkinsGetApi(jobName, "/api/json", 200);
	}
	
	public Result queryBuildResult(String jobName,int buildId){
		return jenkinsGetApi(jobName, "/"+buildId+"/api/json", 200);
	}
	
	public Result getBuildConsoleInfo(String jobName,int buildId){
		return jenkinsGetApi(jobName, "/"+buildId+"/logText/progressiveHtml", 200);
	}
	/**
	 * common private method for jenkins api which use http get
	 * @param jobName
	 * @param apiUrl
	 * @param successHttpCode
	 * @return
	 */
	private Result jenkinsGetApi(String jobName,String apiUrl,int successHttpCode){
		Result result = new Result();
		if(StringUtils.isBlank(jobName)){
			result.setStatus(Status.ERROR);
			result.setMsg("unexpect job name ["+jobName+"]");
			return result;
		}
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(jenkinsUrl+"/job/"+jobName+"/"+apiUrl);
		CloseableHttpResponse response= null;
		try {
			response = httpclient.execute(httpPost);
			int code = response.getStatusLine().getStatusCode();
			if(code==successHttpCode){
				result.setStatus(Status.SUCCESS);
			
				HttpEntity entity = response.getEntity();
				long length = entity.getContentLength();
				//if(length>0){
					result.setResultData(IOUtils.toString(entity.getContent()));
				//}
				EntityUtils.consume(entity);
			}else{
				result.setStatus(Status.ERROR);
				result.setMsg("unexcept http response code :"+code);
			}
			
		} catch (ClientProtocolException e) {
			result.setStatus(Status.ERROR);
			result.setMsg("ClientProtocolException "+e.getMessage());
		} catch (IOException e) {
			result.setStatus(Status.ERROR);
			result.setMsg("IOException "+e.getMessage());
		}finally{
			if(response!=null)
				try {
					response.close();
				} catch (IOException e) {
					LOG.error("can not close http connection", e);
				}
		}
		return result;
		
	}
	
	
	


}
