
import Immutable  from 'immutable';
const PROJECT_CONTEXT="http://localhost:8989/DevOpsPlatform";

export  const URL_PROJECT_LIST=PROJECT_CONTEXT+"/api/project/list";
export  const URL_PROJECT_CREATE=PROJECT_CONTEXT+"/api/project/create";
export const URL_PROJECT_DELETE=PROJECT_CONTEXT+"/api/project/remove";
export const URL_PROJECT_APPEND_APP=PROJECT_CONTEXT+"/api/project/addApp";
export const URL_ALL_INTEGRATION_STATUS=PROJECT_CONTEXT+"/api/project/allBuildInfo";
export const URL_INTEGRATION_RESULT=PROJECT_CONTEXT+"/api/project/buildInfo";
export const URL_INTEGRATION_BUILD=PROJECT_CONTEXT+"/api/project/build";
export const URL_PROJECT_INTEGRATION_RECORDS= PROJECT_CONTEXT+"/api/project/ci/appCIRecords4Project";
export const URL_ALL_INTEGRATION_RECORDS= PROJECT_CONTEXT+"/api/project/ci/allCIRecords";
//status
export const SUCCESS='success';
export const WARNING='warning';
export const ERROR='error';
export const UNKNOW='unknow';
export const INITIAL='initial';

export const TIMERS=new Object();

//action
export const CREATE_APPLICATION_PROMPT='CREATE_APPLICATION_PROMPT';
export const ENTER_APPLICATION_MAIN='ENTER_APPLICATION_MAIN';


export const GIT = 'GIT';
export const SVN = 'SVN';


export const CODE_METRICS=Immutable.fromJS(["classes","directories","files","lines","ncloc","ncloc_language_distribution","functions","statements","public_api"]);
export const TEST_METRICS=Immutable.fromJS(["new_branch_coverage","branch_coverage","coverage","new_coverage","line_coverage","lines_to_cover","test_execution_time","new_line_coverage","tests","skipped_tests",
	                                       "test_errors","test_failures","test_success_density","uncovered_conditions","new_uncovered_conditions"]);
export const SECURITY_METRICS=Immutable.fromJS(["vulnerabilities","new_vulnerabilities","security_rating"]);
export const RELIABILITY_METRICS=Immutable.fromJS(["bugs","new_bugs","reliability_rating"]);
export const MAINTAINABILITY_METRICS=Immutable.fromJS(["code_smells","new_code_smells","sqale_rating","sqale_index","new_technical_debt","sqale_debt_ratio","new_sqale_debt_ratio"]);
export const ISSUES_METRICS=Immutable.fromJS(["new_violations","new_blocker_violations","new_critical_violations","new_major_violations","new_minor_violations",
                             "new_info_violations","violations","blocker_violations","critical_violations","major_violations","minor_violations",
                             "info_violations","false_positive_issues","open_issues","confirmed_issues","reopened_issues"]);
export const DOCUMENTATION_METRICS=Immutable.fromJS(["comment_lines","comment_lines_density","public_documented_api_density","public_undocumented_api","commented_out_code_lines"]);
export const COMPLEXITY_METRICS=Immutable.fromJS(["complexity","class_complexity","file_complexity","function_complexity"]);
export const QUALITY_GATE=Immutable.fromJS(["alert_status","quality_gate_details"]);
export const DUPLICATIONS_METRICS=Immutable.fromJS(["duplicated_blocks","duplicated_files","duplicated_lines","duplicated_lines_density"]);


