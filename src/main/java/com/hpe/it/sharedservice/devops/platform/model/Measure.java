package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;

public class Measure {
	private String metric;
	private String value;
	private List<MetricPeriod> periods;
	private MeasureCondition condition;
	public String getMetric() {
		return metric;
	}
	public void setMetric(String metric) {
		this.metric = metric;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public List<MetricPeriod> getPeriods() {
		return periods;
	}
	public void setPeriods(List<MetricPeriod> periods) {
		this.periods = periods;
	}
	public MeasureCondition getCondition() {
		return condition;
	}
	public void setCondition(MeasureCondition condition) {
		this.condition = condition;
	}
	
}
