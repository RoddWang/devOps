package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;

public class QualityGate {
	private String level;
	private List<MeasureCondition> conditions;
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public List<MeasureCondition> getConditions() {
		return conditions;
	}
	public void setConditions(List<MeasureCondition> conditions) {
		this.conditions = conditions;
	}
	
	
}
