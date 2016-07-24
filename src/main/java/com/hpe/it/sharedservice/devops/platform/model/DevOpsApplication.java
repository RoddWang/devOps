package com.hpe.it.sharedservice.devops.platform.model;


public class DevOpsApplication {
	private String _id;
	private String applicationName;
	private SCM scm;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}

	public String getApplicationName() {
		return applicationName;
	}
	public void setApplicationName(String applicationName) {
		if(applicationName!=null){
			applicationName = applicationName.toLowerCase();
		}
		this.applicationName = applicationName;
	}
	public SCM getScm() {
		return scm;
	}
	public void setScm(SCM scm) {
		this.scm = scm;
	}
	
	
/*	public int getLatestBuildNum(){
		if(integrationRecords==null||integrationRecords.size()==0){
			return 1;
		}else{
			int latestIndex=1;
			for (IntegrationRecord integrationRecord : integrationRecords) {
				if(integrationRecord.getJenkinsId() >= 1){
					latestIndex=integrationRecord.getJenkinsId();
				}
				
			}
			return latestIndex;
		}
	}*/
	
/*	public IntegrationRecord getRecordByJenkinsId(int id){
		if(integrationRecords==null)
		    return null;
		for (IntegrationRecord integrationRecord : integrationRecords) {
			if(integrationRecord.getJenkinsId() == id){
				return integrationRecord;
			}
		}
		return null;
	}*/

}
