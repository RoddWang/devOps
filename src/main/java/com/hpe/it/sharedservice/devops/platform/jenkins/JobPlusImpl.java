package com.hpe.it.sharedservice.devops.platform.jenkins;

import java.text.MessageFormat;

import org.jdom2.Document;

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
		return MessageFormat.format(super.asXml(),"customized",super.getName(),super.getScmConfig().getAddress());
	}
	
	

}
