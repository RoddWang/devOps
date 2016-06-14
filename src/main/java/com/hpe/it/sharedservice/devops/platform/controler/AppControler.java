package com.hpe.it.sharedservice.devops.platform.controler;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import nl.tudelft.jenkins.auth.User;
import nl.tudelft.jenkins.auth.UserImpl;
import nl.tudelft.jenkins.jobs.Job;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hpe.it.sharedservice.devops.platform.model.DevOpsApplication;
import com.hpe.it.sharedservice.devops.platform.model.DevOpsService;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;
import com.hpe.it.sharedservice.devops.platform.service.DevOpsApplicationService;
import com.hpe.it.sharedservice.devops.platform.service.JenkinsService;

@Controller
@RequestMapping("/api/app")
public class AppControler {

	private Log LOG = LogFactory.getLog(getClass());
	@Autowired
	private DevOpsApplicationService devOpsApplicationService;

	@ResponseBody()
	@RequestMapping("/")
	public Result getAllApp() {
		System.out.println("asdfasf");
		Result result = new Result();
		List<String> ids = new ArrayList<String>();
		ids.add("0af0df8c-7fe2-4504-a068-4971a49c0f72");
		result.setStatus(Status.SUCCESS);
		result.setResultData(devOpsApplicationService.getApplicationByIdList(ids));
		return result;
		
	}

	@ResponseBody()
	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public Result create(@RequestBody DevOpsApplication app) {
		LOG.info("Saving application:_id=" + app.getName());
		Result result = new Result();
		try {
			app.set_id(UUID.randomUUID().toString());
			devOpsApplicationService.createApplication(app);
		} catch (Exception e) {
			result.setMsg(e.getMessage());
			result.setStatus(Status.ERROR);
			LOG.error("Saving application failed");
		}
		result.setResultData(app);
		return result;
	}

	@ResponseBody()
	@RequestMapping(value = "/remove", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public Result remove(String appId) {
		LOG.info("removing application:_id=" + appId);
		Result result = new Result();
		if (!devOpsApplicationService.deleteApplication(appId)) {
			result.setStatus(Status.ERROR);
			LOG.info("removing application failed");
		}
		return result;
	}

	/**
	 * 
	 * @param service
	 *            json request
	 * @return
	 * @throws MalformedURLException
	 */
	@ResponseBody()
	@RequestMapping(value = "/{appId}/addService", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public Result addService(@PathVariable String appId,
			@RequestBody DevOpsService service) throws MalformedURLException {
		Result result = new Result();
		UUID uuid = UUID.randomUUID();
		service.set_id(uuid.toString());
		if (!devOpsApplicationService.appendService(service, appId)) {
			result.setStatus(Status.ERROR);
			result.setMsg("Can not create service");
			LOG.warn("Can not create service");
		} else {
			result.setStatus(Status.SUCCESS);
			result.setResultData(service);
			LOG.info("Create service successfully");
		}

		return result;
	}
}
