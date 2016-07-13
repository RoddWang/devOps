import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CIBuild from '../components/CIBuild';
import * as integration from '../actions/integration';

//将state.counter绑定到props的counter
function mapStateToProps(state,route) {
  let proj =  state.projectList.find(project => project._id==route.location.query.projectId);
  for(let index in proj.apps) {
    if(proj.apps[index]._id==route.location.query.appId) {
      var app=proj.apps[index];
      break;
    }
  }
  return {
    project: proj,
    application: app,
    buildResult:state.buildResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(integration, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleCIBuild = connect(mapStateToProps, mapDispatchToProps)(CIBuild);
export default VisibleCIBuild ;
