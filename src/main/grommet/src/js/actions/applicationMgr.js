//import Rest from 'grommet/utils/Rest';
import {URL_PROJECT_APPEND_APP} from '../constants/Constants';
import {SVN, GIT} from '../constants/Constants';
import {  buildQuery ,processStatus  } from 'grommet/utils/Rest';
//import {projectListAction} from './projectList';
export const CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS';
export const CREATE_APPLICATION_ERROR='CREATE_APPLICATION_ERROR';



export function createGitApplicationAction(appId,appName,repository) {
  return createNewApplication(appId,appName,repository,GIT);
}

export function createSVNApplicationAction(appId,appName,repository) {
  return createNewApplication(appId,appName,repository,SVN);
}

function createNewApplication (projectId,appName,repository,scmType) {
  return dispatch => {
    const query = buildQuery({projectId:projectId,appName:appName,repository:repository,scmtype:scmType});
    return fetch(URL_PROJECT_APPEND_APP+`${query}`)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      if(result.status=='SUCCESS') {
        return dispatch({type:CREATE_APPLICATION_SUCCESS,data:result.resultData,prjectId:projectId});
      }else{
        return dispatch({type:CREATE_APPLICATION_ERROR,msg:result.msg});
      }
    });
  };
}


