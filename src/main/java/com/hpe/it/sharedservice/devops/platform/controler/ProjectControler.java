package com.hpe.it.sharedservice.devops.platform.controler;

import java.net.MalformedURLException;
import java.util.UUID;



import org.apache.commons.lang.StringUtils;

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
import com.hpe.it.sharedservice.devops.platform.model.SCM;
import com.hpe.it.sharedservice.devops.platform.service.DevOpsProjectService;
import com.hpe.it.sharedservice.devops.platform.service.ci.IntegrationService;

import freemarker.template.utility.StringUtil;

@Controller
@RequestMapping("/api/project")
public class ProjectControler {

	private static Log LOG = LogFactory.getLog(ProjectControler.class);
	@Autowired
	private DevOpsProjectService devOpsProjectService;
	@Autowired
	private IntegrationService integrationService;
	
	
	@ResponseBody()
	@RequestMapping("/list")
	public Result getAllApp() {
		Result result = new Result();
		result.setStatus(Status.SUCCESS);
		result.setResultData(devOpsProjectService.getAllProjects());
		return result;
		
	}
	
	@ResponseBody()
	@RequestMapping(value = "/create")
	public Result create(String name) {
		LOG.info("Saving application:_id=" + name);
		Result result = new Result();
		DevOpsProject project = new DevOpsProject();
		project.setName(name);
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
	@RequestMapping(value = "/remove")
	public Result remove(String _id) {
		LOG.info("removing project:_id=" + _id);
		Result result = new Result();
		if (!devOpsProjectService.deleteProject(_id)) {
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
	@RequestMapping(value = "/addApp")
	public Result addApp(String projectId,
			String appName,String repository,SCM.SCMType scmtype) throws MalformedURLException {
		DevOpsApplication app = new DevOpsApplication();
		app.set_id(UUID.randomUUID().toString());
		app.setApplicationName(appName);
		app.setScm(new SCM(scmtype,repository));
		Result result = new Result();
		if (!devOpsProjectService.appendApplication(app, projectId)) {
			result.setStatus(Status.ERROR);
			result.setMsg("Can not create service");
			LOG.warn("Can not create service");
		} else {
			result.setStatus(Status.SUCCESS);
			result.setResultData(app);
			Result launchResult = integrationService.integrate(app);
			if(!launchResult.getStatus().equals(Status.SUCCESS)){
				result.setStatus(Status.WARNING);
				result.setMsg("Can not launch the build works please check <a href=\""+integrationService.getJenkinsHost()+"/"+app.getApplicationName()+"\"> jenkins </a>");
			}else{
				result.setMsg("Create service successfully");
				LOG.info("Create service successfully");
			}
			
		}
		
		return result;
	}
	@ResponseBody()
	@RequestMapping(value = "/build")
	public Result build(String projectId,String appId){
		System.out.println("projectId "+projectId+"  |   appId "+appId);
		LOG.debug("projectId "+projectId);
		LOG.debug("appId "+appId);
		if(StringUtils.isBlank(projectId)||StringUtils.isBlank(appId)){
			Result result = new Result();
			result.setStatus(Status.ERROR);
			result.setMsg("unexpect parameters");
			return result;
		}
		DevOpsProject project = devOpsProjectService.getProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		
		if(app==null){
			Result result = new Result();
			result.setStatus(Status.ERROR);
			result.setMsg("Can not find given application");
			return result;
		}
		return integrationService.integrate(app);
	}
	
	@ResponseBody()
	@RequestMapping(value = "/buildInfo")
	public Result buildInfo(String projectId,String appId,int buildId){
		DevOpsProject project = devOpsProjectService.getProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		
		if(app==null){
			Result result = new Result();
			result.setStatus(Status.ERROR);
			result.setMsg("Can not find given application");
			return result;
		}
		return integrationService.queryBuildResult(app.getApplicationName(), buildId);
	}
	
	@ResponseBody()
	@RequestMapping(value = "/allBuildInfo")
	public Result allBuildInfo(String projectId,String appId){
		DevOpsProject project = devOpsProjectService.getProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		
		if(app==null){
			Result result = new Result();
			result.setStatus(Status.ERROR);
			result.setMsg("Can not find given application");
			return result;
		}
		return integrationService.queryAllBuildInfo(app.getApplicationName());
	}
	
	@ResponseBody()
	@RequestMapping(value = "/buildConsole")
	public Result buildConsole(String projectId,String appId,int buildId){
		DevOpsProject project = devOpsProjectService.getProjectById(projectId);
		DevOpsApplication app = project.findAppById(appId);
		
		if(app==null){
			Result result = new Result();
			result.setStatus(Status.ERROR);
			result.setMsg("Can not find given application");
			return result;
		}
		return integrationService.getBuildConsole(app.getApplicationName(), buildId);
	}
}
