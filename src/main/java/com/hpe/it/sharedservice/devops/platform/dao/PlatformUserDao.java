package com.hpe.it.sharedservice.devops.platform.dao;

import org.springframework.stereotype.Repository;

import com.hpe.it.sharedservice.devops.platform.model.Application;
import com.hpe.it.sharedservice.devops.platform.model.PlatformUser;
import com.hpe.it.sharedservice.devops.platform.utils.mongo.CustomizedJSONDataDao;

@Repository("platformUserDao")
public class PlatformUserDao extends CustomizedJSONDataDao<PlatformUser>{

	@Override
	public Class<PlatformUser> getTClass() {
		return PlatformUser.class;
	}

	@Override
	public String getCollectionName() {
		// TODO Auto-generated method stub
		return "DevOpsApplication";
	}

}
