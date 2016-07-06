package com.hpe.it.sharedservice.devops.platform.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hpe.it.sharedservice.devops.platform.utils.Constants;
import com.hpe.it.sharedservice.devops.platform.utils.http.HttpUtil;

@Service
public class SonarQubeService {
	private static String SONAR_HOST="http://localhost:9000/";
	
	public String fetchSonarQubeMetricReport(String appName,List<String> measures) throws IOException{
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
		return HttpUtil.sonarQubeGetApi(SONAR_HOST+"api/measures/component", params);
	}
	
	
	
}
