package com.hpe.it.sharedservice.devops.platform.service.ci;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;

@Service
public class IntegrationService {
	@Autowired
	private JenkinsService jenkinsService;
	
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
		return jenkinsService.queryBuildResult(jobName, buildId);
	}
	
	public String getJenkinsHost(){
		return jenkinsService.getJenkinsHost();
	}
	
	public Result getBuildConsole(String jobName, int buildId){
		return jenkinsService.getBuildConsoleInfo(jobName, buildId);
	}
}
