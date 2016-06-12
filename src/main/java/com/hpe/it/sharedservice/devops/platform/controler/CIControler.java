package com.hpe.it.sharedservice.devops.platform.controler;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hpe.it.sharedservice.devops.platform.model.Application;
import com.hpe.it.sharedservice.devops.platform.model.Service;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;

@Controller
@RequestMapping("/api")
public class CIControler {
    @Autowired
	JenkinsService jenkinsService;
    
    /**
     * 
     * @param service json request
     * @return
     * @throws MalformedURLException
     */
	@ResponseBody()
	@RequestMapping(value="/service/create" ,method=RequestMethod.POST,produces = "application/json;charset=utf-8")
	public Service createService(@RequestBody Service service) throws MalformedURLException{
		UUID uuid = UUID.randomUUID();
		service.setUuid(uuid.toString());
		jenkinsService.createJob(service);
		return service;
	}
	
	@ResponseBody()
	@RequestMapping(value="/application/create" ,method=RequestMethod.POST,produces = "application/json;charset=utf-8")
	public Application createApplication(){
		//TODO 
		return null;
		
	}
	
	
}
