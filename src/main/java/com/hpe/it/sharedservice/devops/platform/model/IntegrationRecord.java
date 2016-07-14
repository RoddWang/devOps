package com.hpe.it.sharedservice.devops.platform.model;

import java.util.UUID;

import com.hpe.it.sharedservice.devops.platform.utils.TimeUtil;


public class IntegrationRecord {
	private String _id;
	private long buildNo;
	private int jenkinsId;
	private String version;
	private String startUTC;
	private String endUTC;
	private IntegrationStatus status;
	private String appId;
	private Object result;

	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public long getBuildNo() {
		return buildNo;
	}

	public void setBuildNo(long buildNo) {
		this.buildNo = buildNo;
	}

	public IntegrationRecord(int jenkinsId,String appId,long BuildNo) {
		super();
		this._id = UUID.randomUUID().toString();
		this.jenkinsId=jenkinsId;
		this.status=IntegrationStatus.SPINNING;
		this.appId=appId;
		//this.startUTC = TimeUtil.formatUTCTime();
		this.buildNo=BuildNo;
	}

	public int getJenkinsId() {
		return jenkinsId;
	}

	public void setJenkinsId(int jenkinsId) {
		this.jenkinsId = jenkinsId;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}


	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public IntegrationStatus getStatus() {
		return status;
	}

	public void setStatus(IntegrationStatus status) {
		this.status = status;
	}

	public String getStartUTC() {
		return startUTC;
	}

	public void setStartUTC(String startUTC) {
		this.startUTC = startUTC;
	}

	public String getEndUTC() {
		return endUTC;
	}

	public void setEndUTC(String endUTC) {
		this.endUTC = endUTC;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}
	
	
	
}
