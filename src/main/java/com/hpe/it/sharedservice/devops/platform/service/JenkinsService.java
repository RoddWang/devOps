package com.hpe.it.sharedservice.devops.platform.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.client.JenkinsClient;
import nl.tudelft.jenkins.guice.JenkinsWsClientGuiceModule;
import nl.tudelft.jenkins.jobs.GitScmConfig;
import nl.tudelft.jenkins.jobs.Job;
import nl.tudelft.jenkins.jobs.SVNScmConfig;
import nl.tudelft.jenkins.jobs.ScmConfig;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;

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
			client = injector.getInstance(JenkinsClient.class);
		} catch (MalformedURLException e) {
			LOG.fatal("Can not find jenkins", e);
		}
	}

	public Job createJob(DevOpsApplication service, List<User> owners)
			throws MalformedURLException {
		ScmConfig scmConfig = null;
		switch (service.getScm().getScmType()) {
		case GIT:
			scmConfig = new GitScmConfig(service.getScm().getRepoUrl());
			break;
		case SVN:
			scmConfig = new SVNScmConfig(service.getScm().getRepoUrl());
			break;
		default:
			break;
		}

		final Job job = client.createJob(service.getApplicationName(), scmConfig,
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

}
