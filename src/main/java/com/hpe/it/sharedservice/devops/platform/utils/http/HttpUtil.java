package com.hpe.it.sharedservice.devops.platform.utils.http;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.hpe.it.sharedservice.devops.platform.exception.DevOpsException;
import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;


public class HttpUtil {
	private static Log LOG = LogFactory.getLog(HttpUtil.class);
	public static Result sonarQubeGetApi(String apiurl,Map<String, String> params) throws IOException{
        Result result = new Result();
		CloseableHttpClient httpclient = HttpClients.createDefault();
		
		HttpPost httpPost = new HttpPost(apiurl+buildQuery(params));
		CloseableHttpResponse response= null;
		try {
			response = httpclient.execute(httpPost);
			HttpEntity entity = response.getEntity();
			if(response.getStatusLine().getStatusCode()==404){
				result.setStatus(Status.ERROR);
				result.setMsg("404 Found");
			}
			result.setResultData(IOUtils.toString(entity.getContent()));
			EntityUtils.consume(entity);
			
		} catch (ClientProtocolException e) {
			LOG.error("ClientProtocolException "+e.getMessage());
			throw e;
		} catch (IOException e) {
			LOG.error("IOException "+e.getMessage());
			throw e;
		}finally{
			if(response!=null)
				try {
					response.close();
				} catch (IOException e) {
					LOG.error("can not close http connection", e);
				}
		}
		return result;
	}
	
	public static String buildQuery(Map<String, String> params){
		if(params==null||params.size()==0){
			return "";
		}
		StringBuilder sb = new StringBuilder("?");
		for (Entry<String, String> entry : params.entrySet()) {
			sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
		}
		return sb.toString();
	}
}
