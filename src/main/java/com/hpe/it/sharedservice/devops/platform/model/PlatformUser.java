package com.hpe.it.sharedservice.devops.platform.model;

import java.util.ArrayList;
import java.util.List;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;

public class PlatformUser {
	private String name;
	private String email;
	private List<Application> apps;
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

	
	public List<Application> getApps() {
		return apps;
	}

	public void setApps(List<Application> apps) {
		this.apps = apps;
	}

	public static User toJenkinsUser(PlatformUser devopsUser) {
		return new UserImpl(devopsUser.name, devopsUser.email);
	}

	public static List<User> toJenkinsUserList(List<PlatformUser> devopsUsers) {
		List<User> users = new ArrayList<User>();
		if (devopsUsers != null) {
			for (PlatformUser devopsUser : devopsUsers) {
				users.add(new UserImpl(devopsUser.name, devopsUser.email));
			}
		}

		return users;
	}
}
