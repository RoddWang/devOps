import {ERROR,INITIAL,SUCCESS} from '../constants/Constants';
import Immutable  from 'immutable';
import {CREATE_APPLICATION_ERROR,CREATE_APPLICATION_SUCCESS} from '../actions/applicationMgr';
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default function layerMsg(state=Immutable.Map({msg:null,status:INITIAL}), action) {
  switch (action.type) {
    case CREATE_APPLICATION_ERROR:
      console.log("process state of layer");
      return state.set('msg',action.msg).set('status',ERROR);
    case CREATE_APPLICATION_SUCCESS:
      return state.set('msg',"create success").set('status',SUCCESS).set('newApp',action.data);
    default:
      return state;
  }
}
