package com.hpe.it.sharedservice.devops.platform.model;

public class SCM {
	public static enum SCMType{SVN,GIT}
	private SCMType scmType;
	private String repoUrl;
	
	
	public SCM(SCMType scmType, String repoUrl) {
		super();
		this.scmType = scmType;
		this.repoUrl = repoUrl;
	}
	public SCMType getScmType() {
		return scmType;
	}
	public void setScmType(SCMType scmType) {
		this.scmType = scmType;
	}
	public String getRepoUrl() {
		return repoUrl;
	}
	public void setRepoUrl(String repoUrl) {
		this.repoUrl = repoUrl;
	}
	
	
}
