import {  buildQuery ,processStatus } from 'grommet/utils/Rest';
import {URL_PROJECT_INTEGRATION_RECORDS,URL_ALL_INTEGRATION_RECORDS} from '../constants/Constants';
import Immutable  from 'immutable';
export const REFRESH_INTEGRATION_RECORD ="REFRESH_INTEGRATION_RECORD";
export function refreshIntegrationByApp(projectId) {
  console.log("refreshIntegrationByApp");
  return dispatch => {
    const query = buildQuery({projectId:projectId});
    return fetch(URL_PROJECT_INTEGRATION_RECORDS+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      if(result.status=='SUCCESS') {
        return dispatch({type:REFRESH_INTEGRATION_RECORD,data:Immutable.fromJS(result.resultData)});
      }else{
        //return dispatch({type:INTEGRATION_FAILED,data:result});
      }
    });
  };
}

export function refreshAllIntegrationRecord() {
  console.log("refreshAllIntegrationRecord");
  return dispatch => {

    return fetch(URL_ALL_INTEGRATION_RECORDS)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      
      if(result.status=='SUCCESS') {

        return dispatch({type:REFRESH_INTEGRATION_RECORD,data:Immutable.fromJS(result.resultData)});
      }else{
        //return dispatch({type:INTEGRATION_FAILED,data:result});
      }
    });
  };
}
