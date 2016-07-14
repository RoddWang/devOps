package com.hpe.it.sharedservice.devops.platform.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtil {
	/**
	 * get utc time
	 * @return
	 */
	public static Date UTCTime() {
		
		//1 get local date
		final java.util.Calendar cal = java.util.Calendar.getInstance();
		System.out.println(cal.getTime());
		// 2 get time offset
		final int zoneOffset = cal.get(java.util.Calendar.ZONE_OFFSET);
		System.out.println(zoneOffset);
		// 3、get time range
		final int dstOffset = cal.get(java.util.Calendar.DST_OFFSET);
		System.out.println(dstOffset);
		// 4 get utc time
		cal.add(java.util.Calendar.MILLISECOND, -(zoneOffset + dstOffset));
		return cal.getTime();
	}
	
	public static String formatUTCTime(){
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(UTCTime());
	}
}
