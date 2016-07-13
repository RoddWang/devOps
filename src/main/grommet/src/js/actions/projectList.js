//import Rest from 'grommet/utils/Rest';
//import fetch from 'isomorphic-fetch';
import {URL_PROJECT_LIST} from '../constants/Constants';

export const PROJECT_LIST = 'PROJECT_LIST';

export function projectListAction() {
  return dispatch => {
    console.log("URL_PROJECT_LIST",URL_PROJECT_LIST);
    
    return fetch(URL_PROJECT_LIST)
      .then(response => response.json())
      .then(json =>dispatch({type:PROJECT_LIST,data:json.resultData}));
  };
}
