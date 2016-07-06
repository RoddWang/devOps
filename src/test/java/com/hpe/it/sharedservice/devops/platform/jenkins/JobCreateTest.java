package com.hpe.it.sharedservice.devops.platform.jenkins;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;
import nl.tudelft.jenkins.client.JenkinsClient;
import nl.tudelft.jenkins.guice.JenkinsWsClientGuiceModule;
import nl.tudelft.jenkins.jobs.GitScmConfig;
import nl.tudelft.jenkins.jobs.Job;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class JobCreateTest {
	private Injector injector;

	private JenkinsClient client;
	protected static final String JOB_SCM_URL = "git@github.hpe.com:xiang-guan/DevOps.git";

    private static URL defaultJenkinsUrl;
    private static String defaultJenkinsUser;
    private static String defaultJenkinsPass;
    private static final User USER0 = new UserImpl("xiang.guan", "xiang.guan@hpe.com");

	private static final List<User> USERS = new ArrayList<User>();
	@Autowired
	private JenkinsService jenkinsService;
	static {
		USERS.add(USER0);
	}
	@BeforeClass
	public static void loadResources() throws Exception {
		defaultJenkinsUrl = new URL("http://localhost:8080/");
		defaultJenkinsUser = "commonUser";
		defaultJenkinsPass = "1qaz@WSX";
	}

	@Test
	public void createTest() {
		injector = Guice.createInjector(new JenkinsWsClientGuiceModule(
				defaultJenkinsUrl, defaultJenkinsUser, defaultJenkinsPass));
        
		client = injector.getInstance(JenkinsClientPlusImpl.class);
		GitScmConfig scmConfig = new GitScmConfig(JOB_SCM_URL);
		final Job job = client.createJob("TestJob_323sdl3d", scmConfig, USERS);
		job.asXml();
		Assert.assertNotNull(job);
		client.retrieveJob(job.getName());
	}
	@Test
	public void build(){
		Result result = jenkinsService.launchBuild("DevOpsPlatform");
		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}
}
