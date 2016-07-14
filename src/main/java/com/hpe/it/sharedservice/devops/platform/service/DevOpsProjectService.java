package com.hpe.it.sharedservice.devops.platform.service;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.dao.DevOpsProjectDao;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsProject;
import com.hpe.it.sharedservice.devops.platform.model.IntegrationRecord;
import com.hpe.it.sharedservice.devops.platform.model.IntegrationStatus;
import com.hpe.it.sharedservice.devops.platform.utils.TimeUtil;

@Service
public class DevOpsProjectService {
	private static Log LOG = LogFactory.getLog(DevOpsProjectService.class);
	@Autowired
	private DevOpsProjectDao devOpsProjectDao;
	@Autowired
	private JenkinsService jenkinsService;

	/**
	 * Get single DevOpsProject by id
	 * 
	 * @param _id
	 * @return DevOpsProject
	 */
	public DevOpsProject getProjectById(String _id) {
		return devOpsProjectDao.getDevOpsProjectById(_id);
	}
	
	/**
	 * Get single DevOpsProject by id list
	 * 
	 * @param _id
	 * @return DevOpsProject
	 */
	public List<DevOpsProject> getProjectByIdList(List<String> ids){
		return devOpsProjectDao.getDevOpsProjectByIdList(ids);
	}

	/**
	 * Get single DevOpsProject by id list
	 * 
	 * @param _id
	 * @return DevOpsProject
	 */
	public List<DevOpsProject> getAllProjects(){
		return devOpsProjectDao.getAllDevOpsProject();
	}
	/**
	 * create a new application
	 * 
	 * @param application
	 * @throws Exception
	 */
	public void createProject(DevOpsProject application)
			throws Exception {
		if (StringUtils.isBlank(application.get_id())) {
			throw new Exception("aplication._id can not be blank");
		}
		devOpsProjectDao.saveNewObject(application);
	}

	/**
	 * delete application against _id
	 * 
	 * @param _id
	 * @return true if success
	 */
	public boolean deleteProject(String _id) {
		return devOpsProjectDao.removeProject(_id);
	}

	/**
	 * update application, will fail if _id is blank
	 * 
	 * @param app
	 * @return true if success
	 */
	public boolean updateProject(DevOpsProject project) {
		if (StringUtils.isBlank(project.get_id())) {
			return false;
		} else {
			return devOpsProjectDao.updateProject(project);
		}
	}

	/**
	 * create a service against the application
	 * 
	 * @param service
	 * @param appId
	 * @return
	 * @throws MalformedURLException
	 */
	public boolean appendApplication(DevOpsApplication application, String projectId) {
		DevOpsProject app =null;
		try {
			List<User> owners = new ArrayList<User>();
			owners.add(new UserImpl("guanx", "xiang.guan@hpe.com"));
			jenkinsService.createJob(application, owners);
			app = devOpsProjectDao
					.getDevOpsProjectById(projectId);
			if (app == null) {
				return false;
			}else{
				app.addDevOpsApplication(application);
			}
		} catch (Error e) {
			LOG.error("Error occures when create jenkins job", e);
			jenkinsService.retrieveJob(application);
			return false;
		}catch(Exception e){
			LOG.error("Exception occures when create jenkins job", e);
			jenkinsService.retrieveJob(application);
			return false;
		}
		return devOpsProjectDao.updateProject(app);
	}
/*	*//**
	 * append a integration record to specific application
	 * @param projectId
	 * @param appId
	 * @param record
	 * @return
	 *//*
	public boolean appendIntegrationRecord(String projectId,String appId,IntegrationRecord record){
		DevOpsProject project =null;
		project = devOpsProjectDao
				.getDevOpsProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		
		if(app==null){return false;}
		else{
			record.setStartUTC(TimeUtil.formatUTCTime());
			app.addRecord(record.get_id());
			}
		
		return devOpsProjectDao.updateProject(project);

	}*/
	
/*	*//**
	 * update a integration record to specific application and jenkins id
	 * @param projectId
	 * @param appId
	 * @param record
	 * @param jenkinsId
	 * @return
	 *//*
	public boolean updateIntegrationRecord(String projectId,String appId,Map<String,Object> recordData,int jenkinsId,IntegrationStatus newStatus){
		DevOpsProject project =null;
		project = devOpsProjectDao
				.getDevOpsProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		IntegrationRecord record = app.getRecordByJenkinsId(jenkinsId);
		if(record!=null){
			record.setResult(recordData);
			record.setStatus(newStatus);
			record.setEndUTC(TimeUtil.formatUTCTime());
		}
		
		return devOpsProjectDao.updateProject(project);

	}*/
}
