//import Rest from 'grommet/utils/Rest';
import {URL_ALL_INTEGRATION_STATUS ,URL_INTEGRATION_RESULT,TIMERS} from '../constants/Constants';
import {URL_INTEGRATION_BUILD} from '../constants/Constants';
import {  buildQuery ,processStatus } from 'grommet/utils/Rest';
import {REFRESH_INTEGRATION_RECORD} from '../actions/integrationRecord';
import Immutable  from 'immutable';
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


export function queryIntegrationResult(recordId) {
  console.log("queryIntegrationResult_1");
  return dispatch => {
    const query = buildQuery({recordId:recordId});
    return fetch(URL_INTEGRATION_RESULT+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      console.log("queryIntegrationResult_2");
      if(result.resultData.status!=='SPINNING') {
        console.log("close timer for "+result.resultData._id);
        clearInterval(TIMERS[result.resultData._id]);
        let record = Immutable.List.of(Immutable.fromJS(result.resultData));
        console.log("queryIntegrationResult",result.resultData);
        return dispatch({type:REFRESH_INTEGRATION_RECORD,data:record});
      }
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
      if(result.status=='SUCCESS'&&!TIMERS[result.resultData._id]) {
        return dispatch({type:INTEGRATION_BUILD_SUCCESS,newRecord:result.resultData});
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



