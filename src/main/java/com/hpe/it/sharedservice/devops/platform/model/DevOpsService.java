package com.hpe.it.sharedservice.devops.platform.model;

public class DevOpsService {
	private String _id;
	private String serviceName;
	private SCM scm;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
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
