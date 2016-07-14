package com.hpe.it.sharedservice.devops.platform.model;

public class MetricPeriod {
	private int index;
	private String value;
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public MetricPeriod(int index, String value) {
		super();
		this.index = index;
		this.value = value;
	}
	
}
