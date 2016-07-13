import { PROJECT_LIST } from '../actions/projectList';
import { PROJECT_DELETE_SUCCESS } from '../actions/projectItem';
import {CREATE_PROJECT_SUCCESS} from '../actions/newProject';
import {CREATE_APPLICATION_SUCCESS} from '../actions/applicationMgr';
import Immutable  from 'immutable';

export default function projectListUpdate(state = Immutable.List.of(), action) {
  switch (action.type) {
    case PROJECT_LIST:
      state = Immutable.List.of();
      for (let i = 0; i < action.data.length; i++) {
        state = state.push(action.data[i]);
      }
      return state;
    case PROJECT_DELETE_SUCCESS:
      let delIndex = state.findIndex((element,index,arr) => {
        if(element._id===action.id) {
          return true;
        }
        return false;
      });
      console.log("delIndex",delIndex);
      let newState = state.splice(delIndex,1);
      console.log("after delete",newState);
      return newState;
    case CREATE_PROJECT_SUCCESS:
      return state.push(action.data);
    case CREATE_APPLICATION_SUCCESS:
      console.log("CREATE_APPLICATION_SUCCESS");
      let modifyIndex = state.findIndex((element,index,arr) => {
        if(element._id===action.projectId) {
          return true;
        }
        return false;
      });
      state.get(modifyIndex).apps.push(action.data);
      console.log('CREATE_APPLICATION_SUCCESS state',state);
      return state;
    default:
      return state;
  }
}


