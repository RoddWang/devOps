import { CLOSE_CREATE_PROJECT_LAYER } from '../actions/newProject';
//import { OPEN_CREATE_PROJECT_LAYER } from '../actions/searchBox';
import {CREATE_PROJECT_ERROR } from '../actions/newProject';
import {ERROR,INITIAL} from '../constants/Constants';
import Immutable  from 'immutable';


export default function layer(state = Immutable.Map({project:{},error:null,status:INITIAL}), action) {
  console.log("new project state",state);
  let newState;
  switch (action.type) {
    case CLOSE_CREATE_PROJECT_LAYER:
      newState = state.set('error',"").set('status',INITIAL).set('project',{});
      return newState;
    case CREATE_PROJECT_ERROR:
      newState = state.set('error',action.error).set('status',ERROR);
      return newState;
    default:
      return state;
  }
}


