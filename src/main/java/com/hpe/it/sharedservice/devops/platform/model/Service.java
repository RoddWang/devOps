package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;


public class Service {
	private String uuid;
	private String serviceName;
	private SCM scm;
	private List<PlatformUser> owners;
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public List<PlatformUser> getOwners() {
		return owners;
	}
	public void setOwners(List<PlatformUser> owners) {
		this.owners = owners;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public SCM getScm() {
		return scm;
	}
	public void setScm(SCM scm) {
		this.scm = scm;
	}
}
