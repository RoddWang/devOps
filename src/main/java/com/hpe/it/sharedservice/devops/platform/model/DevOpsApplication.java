package com.hpe.it.sharedservice.devops.platform.model;

import java.util.ArrayList;
import java.util.List;

public class DevOpsApplication {
	private String _id;
	private String name;
	private List<DevOpsService> services;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public List<DevOpsService> getServices() {
		return services;
	}
	public void setServices(List<DevOpsService> services) {
		this.services = services;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * Add a new Service to the application
	 * @param service
	 */
	public void addDevOpsService(DevOpsService service){
		if(this.services==null){
			this.services = new ArrayList<DevOpsService>();
		}
		this.services.add(service);
	}
	
}
