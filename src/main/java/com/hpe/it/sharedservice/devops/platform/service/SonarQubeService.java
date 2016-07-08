package com.hpe.it.sharedservice.devops.platform.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;
import com.hpe.it.sharedservice.devops.platform.utils.Constants;
import com.hpe.it.sharedservice.devops.platform.utils.http.HttpUtil;

@Service
public class SonarQubeService {
	private static String SONAR_HOST="http://localhost:9000/";
	
	public Result fetchSonarQubeMetricReport(String appName,List<String> measures) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("componentKey", Constants.SONARQUBE_COMPONENTKEY_PERFIX+":"+appName);
		StringBuilder measuresString=new StringBuilder();
		for (String measure : measures) {
			measuresString.append(measure).append(",");
		}
		if(measuresString.length()>0){
			params.put("metricKeys", measuresString.subSequence(0, measuresString.length()-1).toString());	
		}else{
			params.put("metricKeys", measuresString.toString());
		}
		try {
			return HttpUtil.sonarQubeGetApi(SONAR_HOST+"api/measures/component", params);
		} catch (IOException e) {
			return new Result(Status.ERROR,e.getMessage());
		}
	}
}
