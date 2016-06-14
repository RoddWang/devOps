package com.hpe.it.sharedservice.devops.platform.dao;

import org.springframework.stereotype.Repository;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsUser;
import com.hpe.it.sharedservice.devops.platform.utils.mongo.CustomizedJSONDataDao;

@Repository("devOpsUserDao")
public class DevOpsUserDao extends CustomizedJSONDataDao<DevOpsUser>{

	@Override
	public Class<DevOpsUser> getTClass() {
		return DevOpsUser.class;
	}

	@Override
	public String getCollectionName() {
		// TODO Auto-generated method stub
		return "DevOpsUser";
	}

}
