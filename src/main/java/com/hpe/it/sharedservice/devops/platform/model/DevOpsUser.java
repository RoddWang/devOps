package com.hpe.it.sharedservice.devops.platform.model;

import java.util.List;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;

public class DevOpsUser {
	private String _id;
	private String name;
	private String email;
	private List<String> appsUuid;
	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getAppsUuid() {
		return appsUuid;
	}

	public void setAppsUuid(List<String> appsUuid) {
		this.appsUuid = appsUuid;
	}

	public static User toJenkinsUser(DevOpsUser devopsUser) {
		return new UserImpl(devopsUser.name, devopsUser.email);
	}

/*	public static List<User> toJenkinsUserList(List<PlatformUser> devopsUsers) {
		List<User> users = new ArrayList<User>();
		if (devopsUsers != null) {
			for (PlatformUser devopsUser : devopsUsers) {
				users.add(new UserImpl(devopsUser.name, devopsUser.email));
			}
		}

		return users;
	}*/
}
