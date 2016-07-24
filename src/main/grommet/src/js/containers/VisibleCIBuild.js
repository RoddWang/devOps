import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CIBuild from '../components/CIBuild';
import * as integration from '../actions/integration';
import Immutable  from 'immutable';
//将state.counter绑定到props的counter
function mapStateToProps(state,props) {
  let proj =  state.projectList.find(project => project._id==props.location.query.projectId);
  for(let index in proj.apps) {
    if(proj.apps[index]._id==props.location.query.appId) {
      var app=proj.apps[index];
      break;
    }
  }
  let recordList = Immutable.List.of();
  state.integrationRecords.filter(record=>{
    return app._id===record.get('appId');
  }).forEach((ele,index,arr)=>{
    recordList = recordList.push(ele);
  });
  recordList = recordList.sort((a,b)=>{
    return b.get('buildNo')-a.get('buildNo');
  });

  let curRecord= state.integrationRecords.get(props.location.query.curRecordId);
  if(!curRecord) {
    curRecord = Immutable.Map({buildNo:-1});
  }

  return {
    project: proj,
    application: app,
    buildResult:state.buildResult,
    integrationRecord:curRecord,
    allIntegrationRecords:recordList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(integration, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleCIBuild = connect(mapStateToProps, mapDispatchToProps)(CIBuild);
export default VisibleCIBuild ;
