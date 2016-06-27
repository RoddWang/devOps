package com.hpe.it.sharedservice.devops.platform.jenkins;

import static com.google.common.base.Preconditions.checkArgument;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

import java.net.URL;
import java.util.List;

import javax.inject.Inject;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.client.HttpRestClient;
import nl.tudelft.jenkins.client.HttpRestResponse;
import nl.tudelft.jenkins.client.JenkinsClientImpl;
import nl.tudelft.jenkins.client.exceptions.JenkinsException;
import nl.tudelft.jenkins.guice.JenkinsUrl;
import nl.tudelft.jenkins.jobs.Job;
import nl.tudelft.jenkins.jobs.ScmConfig;

public class JenkinsClientPlusImpl extends JenkinsClientImpl {

	@Inject
	JenkinsClientPlusImpl(HttpRestClient client, @JenkinsUrl URL endpoint) {
		super(client, endpoint);
	}

	@Override
	public Job createJob(String name, ScmConfig scmConfig, List<User> users) {
		 LOG.trace("Creating job {0} @ {1} ...", name, scmConfig);

	        checkArgument(isNotEmpty(name), "name must be non-empty");


	        final Job job = new JobPlusImpl(name);
	        job.setScmConfig(scmConfig);

	        job.clearNotificationRecipients();
	        for (User user : users) {
	            job.addPermissionsForUser(user);
	            job.addNotificationRecipient(user);
	        }

	        final String url = super.getJenkinsEndpoint().toExternalForm() + "/createItem?name=" + name;
	      
	        final String xml = job.asXml();

	        LOG.trace("Creating job ...");
	        HttpRestResponse response = getClient().post(url, "application/xml", xml);

	        if (response.isOk()) {
	            response.consume();
	            return job;
	        } else {
	            String message = "Error occurred while attempting to create job: " + response.getStatusLine();
	            LOG.error(message);
	            throw new JenkinsException(message);
	        }

	}
	
	

}
