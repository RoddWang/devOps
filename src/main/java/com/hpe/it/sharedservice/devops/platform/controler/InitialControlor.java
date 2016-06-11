package com.hpe.it.sharedservice.devops.platform.controler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class InitialControlor {

	@ResponseBody()
	@RequestMapping("/api")
	public Map<String,String> init(){
		Map<String, String> result = new HashMap<String, String>();
		result.put("adf", "asdfeaegas");
		System.out.println("fasdfasfppppppppp");
		return result;
	}
}
