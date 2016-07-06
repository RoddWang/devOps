package com.hpe.it.sharedservice.devops.platform.jenkins;

import java.text.MessageFormat;

import org.jdom2.Document;

import com.hpe.it.sharedservice.devops.platform.utils.Constants;

import nl.tudelft.jenkins.jobs.JobImpl;

public class JobPlusImpl extends JobImpl {

	public JobPlusImpl(String name) {
		super(name);
	}
	public JobPlusImpl(final String name, final Document document) {
		super(name, document);
	}
	
	@Override
	public String asXml() {
		return MessageFormat.format(super.asXml(),Constants.SONARQUBE_COMPONENTKEY_PERFIX,super.getName(),super.getScmConfig().getAddress());
	}
	

}
