package com.hpe.it.sharedservice.devops.platform.model;

import java.util.ArrayList;
import java.util.List;

public class DevOpsProject {
	private String _id;
	private String name;
	private List<DevOpsApplication> apps;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}

	public List<DevOpsApplication> getApps() {
		return apps;
	}
	public void setApps(List<DevOpsApplication> apps) {
		this.apps = apps;
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
	public void addDevOpsApplication(DevOpsApplication service){
		if(this.apps==null){
			this.apps = new ArrayList<DevOpsApplication>();
		}
		this.apps.add(service);
	}
	
}
