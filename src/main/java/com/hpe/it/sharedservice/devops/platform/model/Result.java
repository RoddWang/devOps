package com.hpe.it.sharedservice.devops.platform.model;

/**
 * Data model for result
 * @author xiang.guan@hpe.com
 *
 */
public class Result {
	public static enum Status{SUCCESS,ERROR,WARNING}
	private Status status;
	private String msg;
	private Object resultData;
	
	/**
	 * default success
	 */
	public Result() {
		super();
		this.status=Status.SUCCESS;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getResultData() {
		return resultData;
	}
	public void setResultData(Object resultData) {
		this.resultData = resultData;
	}
	
}
