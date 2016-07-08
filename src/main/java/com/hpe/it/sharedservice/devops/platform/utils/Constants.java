package com.hpe.it.sharedservice.devops.platform.utils;

import java.util.ArrayList;
import java.util.List;

public class Constants {

	public static final String SONARQUBE_COMPONENTKEY_PERFIX="devops";
	
	/**
	 * http://docs.sonarqube.org/display/SONAR/Metric+definitions
	 */
	public static final List<String> SONARQUBE_METRICS = new ArrayList<String>();
	
	static{
		//Complexity
		SONARQUBE_METRICS.add("complexity");
		SONARQUBE_METRICS.add("class_complexity");
		SONARQUBE_METRICS.add("file_complexity");
		SONARQUBE_METRICS.add("function_complexity");
		
		//Documentation
		SONARQUBE_METRICS.add("comment_lines");
		SONARQUBE_METRICS.add("comment_lines_density");
		SONARQUBE_METRICS.add("public_documented_api_density");
		SONARQUBE_METRICS.add("public_undocumented_api");
		SONARQUBE_METRICS.add("commented_out_code_lines");
		
		//Duplications
		SONARQUBE_METRICS.add("duplicated_blocks");
		SONARQUBE_METRICS.add("duplicated_files");
		SONARQUBE_METRICS.add("duplicated_lines");
		SONARQUBE_METRICS.add("duplicated_lines_density");
		
		//Issues
		SONARQUBE_METRICS.add("new_violations");
		SONARQUBE_METRICS.add("new_blocker_violations");
		SONARQUBE_METRICS.add("new_critical_violations");
		SONARQUBE_METRICS.add("new_major_violations");
		SONARQUBE_METRICS.add("new_minor_violations");
		SONARQUBE_METRICS.add("new_info_violations");
		SONARQUBE_METRICS.add("violations");
		SONARQUBE_METRICS.add("blocker_violations");
		SONARQUBE_METRICS.add("critical_violations");
		SONARQUBE_METRICS.add("major_violations");
		SONARQUBE_METRICS.add("minor_violations");
		SONARQUBE_METRICS.add("info_violations");
		
		SONARQUBE_METRICS.add("false_positive_issues");
		SONARQUBE_METRICS.add("open_issues");
		SONARQUBE_METRICS.add("confirmed_issues");
		SONARQUBE_METRICS.add("reopened_issues");
		
		
        //Maintainability 
		SONARQUBE_METRICS.add("code_smells");
		SONARQUBE_METRICS.add("new_code_smells");
		SONARQUBE_METRICS.add("sqale_rating");
		SONARQUBE_METRICS.add("sqale_index");
		SONARQUBE_METRICS.add("new_technical_debt");
		SONARQUBE_METRICS.add("sqale_debt_ratio");
		SONARQUBE_METRICS.add("new_sqale_debt_ratio");
		
		//Quality Gates
		SONARQUBE_METRICS.add("alert_status");
		SONARQUBE_METRICS.add("quality_gate_details");

		
		
		//Reliability
		SONARQUBE_METRICS.add("bugs");
		SONARQUBE_METRICS.add("new_bugs");
		/**
		 * A = 0 Bug
         * B = at least 1 Minor Bug
         * C = at least 1 Major Bug
         * D = at least 1 Critical Bug
         * E = at least 1 Blocker Bug
		 */
		SONARQUBE_METRICS.add("reliability_rating");
		
        //Security
		SONARQUBE_METRICS.add("vulnerabilities");
		SONARQUBE_METRICS.add("new_vulnerabilities");
		/**
		 * 
		 * A = 0 Vulnerability
		 * B = at least 1 Minor Vulnerability
		 * C = at least 1 Major Vulnerability
		 * D = at least 1 Critical Vulnerability
		 * E = at least 1 Blocker Vulnerability
		 */
		SONARQUBE_METRICS.add("security_rating");
		
		//Test
		SONARQUBE_METRICS.add("coverage");
		SONARQUBE_METRICS.add("new_coverage");
		SONARQUBE_METRICS.add("line_coverage");
		SONARQUBE_METRICS.add("new_line_coverage");
		SONARQUBE_METRICS.add("tests");
		SONARQUBE_METRICS.add("skipped_tests");
		SONARQUBE_METRICS.add("test_errors");
		SONARQUBE_METRICS.add("test_failures");
		SONARQUBE_METRICS.add("test_success_density");

		//Code
		SONARQUBE_METRICS.add("classes");
		SONARQUBE_METRICS.add("directories");
		SONARQUBE_METRICS.add("files");
		SONARQUBE_METRICS.add("lines");
		SONARQUBE_METRICS.add("ncloc");
		SONARQUBE_METRICS.add("ncloc_language_distribution");
		SONARQUBE_METRICS.add("functions");
		SONARQUBE_METRICS.add("statements");
		SONARQUBE_METRICS.add("public_api");
		
	}
}
