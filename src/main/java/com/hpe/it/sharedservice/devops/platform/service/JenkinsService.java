package com.hpe.it.sharedservice.devops.platform.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;
import nl.tudelft.jenkins.client.JenkinsClient;
import nl.tudelft.jenkins.guice.JenkinsWsClientGuiceModule;
import nl.tudelft.jenkins.jobs.GitScmConfig;
import nl.tudelft.jenkins.jobs.Job;
import nl.tudelft.jenkins.jobs.SVNScmConfig;
import nl.tudelft.jenkins.jobs.ScmConfig;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.hpe.it.sharedservice.devops.platform.model.PlatformUser;
import com.hpe.it.sharedservice.devops.platform.model.Service;

public class JenkinsService {
    private static String defaultJenkinsUser = "commonUser";
    private static String defaultJenkinsPass = "1qaz@WSX";
    private static String jenkinsUrl = "http://localhost:8080/";
    
	public Job createJob(Service service) throws MalformedURLException{
		JenkinsClient client = getJenkins(new URL(jenkinsUrl));
		ScmConfig scmConfig = null;
		switch (service.getScm().getScmType()) {
		case GIT:
			scmConfig = new GitScmConfig(service.getScm().getRepoUrl() );
			break;
		case SVN:
			scmConfig = new SVNScmConfig(service.getScm().getRepoUrl() );
			break;
		default:
			break;
		}
		
		final Job job = client.createJob(service.getServiceName(), scmConfig, PlatformUser.toJenkinsUserList(service.getOwners()));
		return job;
	}
	
	/**
	 * setup new Jenkins docker instance for newly user.
	 * @return
	 */
	private JenkinsClient setupNewJenkinsInstance(){
		//TO-DO
		return null;
	}
	
	/**
	 * generate Jenkins client according to the new database, if not exist, will create a new one
	 * @param userId
	 * @return
	 */
	public JenkinsClient getJenkins(URL jenkinsurl){
		//TO-DO need modify 
		Injector injector = Guice.createInjector(new JenkinsWsClientGuiceModule(
				jenkinsurl, defaultJenkinsUser, defaultJenkinsPass));
		JenkinsClient client = injector.getInstance(JenkinsClient.class);
		return client;
	}
}
