package com.hpe.it.sharedservice.devops.platform.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.utils.mongo.CustomizedJSONDataDao;
import com.mongodb.BasicDBObject;

@Repository("devOpsApplicationDao")
public class DevOpsApplicationDao extends CustomizedJSONDataDao<DevOpsApplication> {

	@Override
	public Class<DevOpsApplication> getTClass() {
		// TODO Auto-generated method stub
		return DevOpsApplication.class;
	}

	@Override
	public String getCollectionName() {
		// TODO Auto-generated method stub
		return "DevOpsApplication";
	}
	
	/**
	 * Get single DevOpsApplication by id
	 * @param id
	 * @return DevOpsApplication
	 */
	public DevOpsApplication getDevOpsApplicationById(String id){
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", id);
		List<DevOpsApplication> appConfs = getItems(conditionDBObject, null, null);
		if (appConfs != null && appConfs.size() > 0) {
			return appConfs.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * Get single DevOpsApplication by id list
	 * @param id
	 * @return List<DevOpsApplication>
	 */
	public List<DevOpsApplication> getDevOpsApplicationByIdList(List<String> ids){
		List<DevOpsApplication> result = new ArrayList<DevOpsApplication>(ids.size());
		for (String id : ids) {
			BasicDBObject conditionDBObject = new BasicDBObject();
			conditionDBObject.append("_id", id);
			List<DevOpsApplication> appConfs = getItems(conditionDBObject, null, null);
			result.addAll(appConfs);
		}
		return result;
		
	}

	/**
	 * remove application against the _id
	 * @param _id Application id to be updated
	 * @return true if success
	 */
	public boolean removeApplication(String _id){
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", _id);
		int condDBObject = removeDBObject(conditionDBObject);
		if (condDBObject > 0)
			return true;
		else
			return false;
	}
	
	/**
	 * update application against the _id
	 * @param app Application to be updated
	 * @return true if success
	 */
	public boolean updateApplication(DevOpsApplication app){
		if(app==null||StringUtils.isBlank(app.get_id())){
			return false;
		}
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", app.get_id());
		int condDBObject = updateSingleDBObject(conditionDBObject,
				app);
		if (condDBObject > 0)
			return true;
		else
			return false;
	}
}
