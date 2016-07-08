package com.hpe.it.sharedservice.devops.platform.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

import com.hpe.it.sharedservice.devops.platform.model.Result;
import com.hpe.it.sharedservice.devops.platform.model.Result.Status;

public class ResultUtil {
	public static Result combineResults(Map<String, Result> results){
		Result combineResult = new Result(Status.SUCCESS);
		for (Entry<String,Result> result : results.entrySet()) {
			appendResult(combineResult, result);
		}
		return combineResult;
	}
	
	@SuppressWarnings("unchecked")
	private static void appendResult(Result result, Entry<String,Result> addResult){
		
		if(result.getResultData()==null){
			result.setResultData(new HashMap<String, Object>());
		}else{
			Assert.isAssignable(Map.class, result.getResultData().getClass());
		}
		if(Status.SUCCESS.equals(result.getStatus())){
			if(Status.SUCCESS.equals(addResult.getValue().getStatus())){
				result.setStatus(Status.SUCCESS);
			}else if(Status.ERROR.equals(addResult.getValue().getStatus())){
				result.setStatus(Status.ERROR);
			}else{
				result.setStatus(Status.WARNING);
			}
		}else if(Status.ERROR.equals(result.getStatus())){
		    result.setStatus(Status.ERROR);
			
		}else {
			if(Status.ERROR.equals(addResult.getValue().getStatus())){
				result.setStatus(Status.ERROR);
			}else {
				result.setStatus(Status.WARNING);
			}
		}
		((Map<String,Object>)result.getResultData()).put(addResult.getKey(), addResult.getValue().getResultData());
		result.setMsg(StringUtils.trimToEmpty(result.getMsg())+"  ["+addResult.getKey()+"]:"+StringUtils.trimToEmpty(addResult.getValue().getMsg()));
		
	}
}
