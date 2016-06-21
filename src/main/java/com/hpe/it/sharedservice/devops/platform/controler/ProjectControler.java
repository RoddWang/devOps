package com.hpe.it.sharedservice.devops.platform.controler;

import java.net.MalformedURLException;
import java.util.UUID;



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
import com.hpe.it.sharedservice.devops.platform.model.DevOpsProject;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;
import com.hpe.it.sharedservice.devops.platform.service.DevOpsProjectService;

@Controller
@RequestMapping("/api/project")
public class ProjectControler {

	private Log LOG = LogFactory.getLog(getClass());
	@Autowired
	private DevOpsProjectService devOpsProjectService;

	@ResponseBody()
	@RequestMapping("/list")
	public Result getAllApp() {
		Result result = new Result();
		result.setStatus(Status.SUCCESS);
		result.setResultData(devOpsProjectService.getAllProjects());
		return result;
		
	}
	
	@ResponseBody()
	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public Result create(@RequestBody DevOpsProject project) {
		LOG.info("Saving application:_id=" + project.getName());
		Result result = new Result();
		try {
			project.set_id(UUID.randomUUID().toString());
			devOpsProjectService.createProject(project);
		} catch (Exception e) {
			result.setMsg(e.getMessage());
			result.setStatus(Status.ERROR);
			LOG.error("Saving application failed");
		}
		result.setResultData(project);
		return result;
	}

	@ResponseBody()
	@RequestMapping(value = "/remove", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	public Result remove(String projectId) {
		LOG.info("removing project:_id=" + projectId);
		Result result = new Result();
		if (!devOpsProjectService.deleteProject(projectId)) {
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
	public Result addService(@PathVariable String projectId,
			@RequestBody DevOpsApplication app) throws MalformedURLException {
		Result result = new Result();
		UUID uuid = UUID.randomUUID();
		app.set_id(uuid.toString());
		if (!devOpsProjectService.appendApplication(app, projectId)) {
			result.setStatus(Status.ERROR);
			result.setMsg("Can not create service");
			LOG.warn("Can not create service");
		} else {
			result.setStatus(Status.SUCCESS);
			result.setResultData(app);
			LOG.info("Create service successfully");
		}

		return result;
	}
}
