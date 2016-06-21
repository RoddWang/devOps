package com.hpe.it.sharedservice.devops.platform.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsProject;
import com.hpe.it.sharedservice.devops.platform.utils.mongo.CustomizedJSONDataDao;
import com.mongodb.BasicDBObject;

@Repository("devOpsProjectDao")
public class DevOpsProjectDao extends CustomizedJSONDataDao<DevOpsProject> {

	@Override
	public Class<DevOpsProject> getTClass() {
		// TODO Auto-generated method stub
		return DevOpsProject.class;
	}

	@Override
	public String getCollectionName() {
		// TODO Auto-generated method stub
		return "DevOpsProject";
	}
	
	/**
	 * Get single DevOpsProject by id
	 * @param id
	 * @return DevOpsProject
	 */
	public DevOpsProject getDevOpsProjectById(String id){
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", id);
		List<DevOpsProject> appConfs = getItems(conditionDBObject, null, null);
		if (appConfs != null && appConfs.size() > 0) {
			return appConfs.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * Get list DevOpsProject by id list
	 * @param id
	 * @return List<DevOpsProject>
	 */
	public List<DevOpsProject> getDevOpsProjectByIdList(List<String> ids){
		List<DevOpsProject> result = new ArrayList<DevOpsProject>(ids.size());
		for (String id : ids) {
			BasicDBObject conditionDBObject = new BasicDBObject();
			conditionDBObject.append("_id", id);
			List<DevOpsProject> appConfs = getItems(conditionDBObject, null, null);
			result.addAll(appConfs);
		}
		return result;
		
	}

	/**
	 * Get all Application
	 * @param id
	 * @return List<DevOpsProject>
	 */
	public List<DevOpsProject> getAllDevOpsProject(){
		List<DevOpsProject> result = new ArrayList<DevOpsProject>();
		List<DevOpsProject> projects = getItems(null, null, null);
		result.addAll(projects);
		return result;
	}
	/**
	 * remove application against the _id
	 * @param _id Application id to be updated
	 * @return true if success
	 */
	public boolean removeProject(String _id){
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
	public boolean updateProject(DevOpsProject project){
		if(project==null||StringUtils.isBlank(project.get_id())){
			return false;
		}
		BasicDBObject conditionDBObject = new BasicDBObject();
		conditionDBObject.append("_id", project.get_id());
		int condDBObject = updateSingleDBObject(conditionDBObject,
				project);
		if (condDBObject > 0)
			return true;
		else
			return false;
	}
}
