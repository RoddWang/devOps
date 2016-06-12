package com.hpe.it.sharedservice.devops.platform.service;


import org.springframework.beans.factory.annotation.Autowired;

import com.hpe.it.sharedservice.devops.platform.dao.PlatformUserDao;
import com.hpe.it.sharedservice.devops.platform.model.Application;
import com.hpe.it.sharedservice.devops.platform.model.PlatformUser;

/**
 * PlatformUser service 
 * @author guanx
 *
 */
public class PlatformUserService {
	
	@Autowired
	PlatformUserDao platformUserDao;
	
	public PlatformUser getPlatformUser(String email){
		//TODO db operation
		return null;
	}
	
	public void addApplication(Application newApplication) throws Exception{
		//TODO db operation
	}
}
