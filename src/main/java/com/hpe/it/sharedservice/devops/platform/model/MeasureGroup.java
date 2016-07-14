package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;

public class MeasureGroup {
	private String groupName;
	private String displayGroupName;
	private Result.Status status;
	private List<Measure> measures;
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getDisplayGroupName() {
		return displayGroupName;
	}
	public void setDisplayGroupName(String displayGroupName) {
		this.displayGroupName = displayGroupName;
	}
	public Result.Status getStatus() {
		return status;
	}
	public void setStatus(Result.Status status) {
		this.status = status;
	}
	public List<Measure> getMeasures() {
		return measures;
	}
	public void setMeasures(List<Measure> measures) {
		this.measures = measures;
	}
	
	
}
