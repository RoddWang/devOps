//import Rest from 'grommet/utils/Rest';
import {URL_ALL_INTEGRATION_STATUS ,URL_INTEGRATION_RESULT} from '../constants/Constants';
import {URL_INTEGRATION_BUILD} from '../constants/Constants';
import {  buildQuery ,processStatus } from 'grommet/utils/Rest';

export const INTEGRATION_FAILED = 'INTEGRATION_FAILED';
export const INTEGRATION_ALLINFO='INTEGRATION_ALLINFO';
export const INTEGRATION_RESULT='INTEGRATION_RESULT';
export const INTEGRATION_ALLINFO_CLEAR='INTEGRATION_ALLINFO_CLEAR';
export const INTEGRATION_RESULT_CLEAR='INTEGRATION_RESULT_CLEAR';
export const INTEGRATION_DETAIL='INTEGRATION_RESULT_CLEAR';

export const INTEGRATION_BUILD_SUCCESS='INTEGRATION_BUILD';
export const INTEGRATION_BUILD_ERROR='INTEGRATION_BUILD_ERROR';

export function queryAllIntegrationStatus(projectId,appId) {
  return dispatch => {
    const query = buildQuery({projectId:projectId,appId:appId});
    return fetch(URL_ALL_INTEGRATION_STATUS+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      
      if(result.status=='SUCCESS') {
        let allBuildInfo = eval("("+result.resultData+")");
        console.debug("queryIntegrationStatus",allBuildInfo);
        return dispatch({type:INTEGRATION_ALLINFO,data:allBuildInfo});
      }else{
        return dispatch({type:INTEGRATION_FAILED,data:result});
      }
    });
  };
}

export function clearAllIntegrationStatus() {
  return dispatch => {
    return dispatch({type:INTEGRATION_ALLINFO_CLEAR});

  };
}
export function queryIntegrationResultByProject(projectId) {

}

export function queryIntegrationResult(projectId,appId,buildId) {
  return dispatch => {
    const query = buildQuery({projectId:projectId,appId:appId,buildId:buildId});
    return fetch(URL_INTEGRATION_RESULT+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      
      let buildResult = {};
      buildResult.status=result.status;
      buildResult.msg=result.msg;
      buildResult.resultData={};
      buildResult.resultData.build=eval("("+result.resultData.build+")");
      buildResult.resultData.sonar=eval("("+result.resultData.sonar+")");
      return dispatch({type:INTEGRATION_RESULT,data:buildResult});
    });
  };
}

export function clearIntegrationResult() {
  return dispatch => {
    return dispatch({type:INTEGRATION_RESULT_CLEAR});

  };
}



export function build (projectId,appId) {
  return dispatch => {
    
    const query = buildQuery({projectId:projectId,appId:appId});
    return fetch(URL_INTEGRATION_BUILD+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      if(result.status=='SUCCESS') {
        return dispatch({type:INTEGRATION_BUILD_SUCCESS});
      }else{
        return dispatch({type:INTEGRATION_BUILD_ERROR,msg:result.msg});
      }
    })
    .catch(error => {
      console.log("INTEGRATION_BUILD_ERROR",error);
      return dispatch({type:INTEGRATION_BUILD_ERROR,msg:error});
    });
  };
}




