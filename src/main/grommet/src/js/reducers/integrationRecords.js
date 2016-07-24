
import {REFRESH_INTEGRATION_RECORD } from '../actions/integrationRecord';
import {INTEGRATION_BUILD_SUCCESS } from '../actions/integration';
import {CREATE_APPLICATION_SUCCESS} from '../actions/applicationMgr';
import Immutable  from 'immutable';


export default function integrationRecord(state = Immutable.Map(), action) {
  switch (action.type) {
    case REFRESH_INTEGRATION_RECORD:
 
      action.data.forEach((element, index, array)=>{
        let recordId = element.get("_id");
       // console.log("integrationRecord state.get(recordId)",state.get(recordId));
        if(!state.get(recordId)||state.get(recordId).get('status')==='SPINNING') {
          state = state.set(recordId,element);
        }
      });
      console.log("integrationRecord",state.toJS());
      return state;
    case INTEGRATION_BUILD_SUCCESS:
      return state.set(action.newRecord._id,Immutable.fromJS(action.newRecord));
    case CREATE_APPLICATION_SUCCESS:
      return state.set(action.data.record._id,Immutable.fromJS(action.data.record));
    default:
      return state;
  }
}


