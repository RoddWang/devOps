package com.hpe.it.sharedservice.devops.platform.utils;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolMgr {
	private static ThreadPoolExecutor executorPool = new ThreadPoolExecutor(5, 20, 30,  
            TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(5),  
            new ThreadPoolExecutor.CallerRunsPolicy());  
	
	public static ThreadPoolExecutor getPool(){
		return executorPool;
	}
}
