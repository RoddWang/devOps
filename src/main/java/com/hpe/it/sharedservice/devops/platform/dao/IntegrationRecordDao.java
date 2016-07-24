package com.hpe.it.sharedservice.devops.platform.dao;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.hpe.it.sharedservice.devops.platform.model.IntegrationRecord;
import com.hpe.it.sharedservice.devops.platform.utils.mongo.CustomizedJSONDataDao;
import com.mongodb.BasicDBObject;

@Repository("integrationRecordDao")
public class IntegrationRecordDao extends CustomizedJSONDataDao<IntegrationRecord> {

	@Override
	public Class<IntegrationRecord> getTClass() {
		return IntegrationRecord.class;
	}

	@Override
	public String getCollectionName() {
		return "DevOpsIntegrationRecord";
	}
	
	public boolean updateRecord(IntegrationRecord record){
		if(record==null||StringUtils.isBlank(record.get_id())){
			return false;
		}
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", record.get_id());
		int condDBObject = updateSingleDBObject(conditionDBObject,
				record);
		if (condDBObject > 0)
			return true;
		else
			return false;
	}
	
	public IntegrationRecord getRecordById(String id){
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", id);
		List<IntegrationRecord> record = getItems(conditionDBObject, null, null);
		if (record != null && record.size() > 0) {
			return record.get(0);
		} else {
			return null;
		}
	}
	
	public List<IntegrationRecord> getRecordsByAppId(String appId){
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("appId", appId);
		return getItems(conditionDBObject, null, null);
		
	}
	public List<IntegrationRecord> getRecordsByAppIdGrp(List<String> appIds){
		BasicDBObject conditionDBObject = new BasicDBObject();
		BasicDBObject inObj = new BasicDBObject();
		inObj.put("$in", appIds);
		conditionDBObject.append("appId", inObj);
		return getItems(conditionDBObject, null, null);
		
	}
	public IntegrationRecord getLatestRecord4App(String appId){
		List<IntegrationRecord> records = getRecordsByAppId(appId);
		if(records==null||records.size()==0){
			return null;
		}else{
			IntegrationRecord latestRecord = null;
			for (IntegrationRecord record : records) {
				if(record.getJenkinsId() >= 1){
					latestRecord=record;
				}
				
			}
			return latestRecord;
		}
	}
	
	public boolean addIntegrationRecord( IntegrationRecord record){
		try {
			saveNewObject(record);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	public long countRecordByAppId(String appId){
		BasicDBObject appid = new BasicDBObject();
		appid.put("appId", appId);
		return countByCondition(appid);
	}
	

}
