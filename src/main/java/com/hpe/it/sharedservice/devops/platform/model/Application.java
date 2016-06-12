package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;

public class Application {
	private String uuid;
	private List<Service> services;
	private List<PlatformUser> appOwners;
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public List<Service> getServices() {
		return services;
	}
	public void setServices(List<Service> services) {
		this.services = services;
	}
	public List<PlatformUser> getAppOwners() {
		return appOwners;
	}
	public void setAppOwners(List<PlatformUser> appOwners) {
		this.appOwners = appOwners;
	}
	
}
