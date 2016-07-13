//import Rest from 'grommet/utils/Rest';
import {URL_PROJECT_CREATE} from '../constants/Constants';
import {  buildParams ,processStatus } from 'grommet/utils/Rest';
//import {projectListAction} from './projectList';
export const CLOSE_CREATE_PROJECT_LAYER = 'CLOSE_CREATE_PROJECT_LAYER';
export const CREATE_PROJECT_ERROR='CREATE_PROJECT_ERROR';
export const CREATE_PROJECT_SUCCESS='CREATE_PROJECT_SUCCESS';

export function closeAction() {
 
  return dispatch => {
    dispatch({type:CLOSE_CREATE_PROJECT_LAYER});
  };

};

export function createNewProjectAction(projectName) {
  return dispatch => {
    const query = buildParams({name:projectName});
    return fetch(URL_PROJECT_CREATE+"?"+query)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      console.log("CREATE_PROJECT_SUCCESS");
      return dispatch({type:CREATE_PROJECT_SUCCESS,data:result.resultData});
    })
    .catch(error => {
      console.log("CREATE_PROJECT_ERROR");
      return dispatch({type:CREATE_PROJECT_ERROR,error:error});
    });
  };
}

