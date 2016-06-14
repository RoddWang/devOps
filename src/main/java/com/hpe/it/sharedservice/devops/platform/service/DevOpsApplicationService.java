package com.hpe.it.sharedservice.devops.platform.service;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.dao.DevOpsApplicationDao;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsService;

@Service
public class DevOpsApplicationService {
	private static Log LOG = LogFactory.getLog(DevOpsApplicationService.class);
	@Autowired
	private DevOpsApplicationDao devopsApplicationDao;
	@Autowired
	private JenkinsService jenkinsService;

	/**
	 * Get single DevOpsApplication by id
	 * 
	 * @param _id
	 * @return DevOpsApplication
	 */
	public DevOpsApplication getApplicationById(String _id) {
		return devopsApplicationDao.getDevOpsApplicationById(_id);
	}
	
	/**
	 * Get single DevOpsApplication by id list
	 * 
	 * @param _id
	 * @return DevOpsApplication
	 */
	public List<DevOpsApplication> getApplicationByIdList(List<String> ids){
		return devopsApplicationDao.getDevOpsApplicationByIdList(ids);
	}

	/**
	 * create a new application
	 * 
	 * @param application
	 * @throws Exception
	 */
	public void createApplication(DevOpsApplication application)
			throws Exception {
		if (StringUtils.isBlank(application.get_id())) {
			throw new Exception("aplication._id can not be blank");
		}
		devopsApplicationDao.saveNewObject(application);
	}

	/**
	 * delete application against _id
	 * 
	 * @param _id
	 * @return true if success
	 */
	public boolean deleteApplication(String _id) {
		return devopsApplicationDao.removeApplication(_id);
	}

	/**
	 * update application, will fail if _id is blank
	 * 
	 * @param app
	 * @return true if success
	 */
	public boolean updateApplication(DevOpsApplication app) {
		if (StringUtils.isBlank(app.get_id())) {
			return false;
		} else {
			return devopsApplicationDao.updateApplication(app);
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
	public boolean appendService(DevOpsService service, String appId) {
		DevOpsApplication app =null;
		try {
			List<User> owners = new ArrayList<User>();
			owners.add(new UserImpl("guanx", "xiang.guan@hpe.com"));
			jenkinsService.createJob(service, owners);
			app = devopsApplicationDao
					.getDevOpsApplicationById(appId);
			if (app == null) {
				return false;
			}
		} catch (MalformedURLException e) {
			LOG.error("Error occures when create jenkins job", e);
			jenkinsService.retrieveJob(service);
			return false;
		}
		return devopsApplicationDao.updateApplication(app);
	}
}
