//import Rest from 'grommet/utils/Rest';
//import fetch from 'isomorphic-fetch';
import {URL_PROJECT_DELETE} from '../constants/Constants';
import {  buildParams  } from 'grommet/utils/Rest';
import {SUCCESS,ERROR} from '../constants/Constants';

export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_FAIL = 'PROJECT_DELETE_FAIL';

export function projectDelete(_id) {
  console.log("delete",_id);
  return dispatch => {
    console.log("URL_PROJECT_DELETE",URL_PROJECT_DELETE);
    const query = buildParams({_id:_id});
    return fetch(URL_PROJECT_DELETE+"?"+query)
        .then(resp =>{
          console.log(resp);
          console.log(dispatch);
          if(resp.status==200) {
            return dispatch({type:PROJECT_DELETE_SUCCESS,status:SUCCESS,id:_id});
          }else{
            return dispatch({type:PROJECT_DELETE_FAIL,status:ERROR});
          }
      	
        });
  };
}

/*export function enterApplicationAction(project) {
  console.log("delete",_id);
  return dispatch => {
  	if(project.apps.length==0){// 
  		return dispatch({type:CREATE_APPLICATION_PROMPT});
  	}
    return dispatch({type:ENTER_APPLICATION_MAIN,project:project});
   };
}


*/
