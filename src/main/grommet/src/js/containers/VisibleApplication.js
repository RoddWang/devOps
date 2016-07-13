import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Application from '../components/Application';
import * as IntegrationAction from '../actions/integration';

//将state.counter绑定到props的counter
function mapStateToProps(state,route) {
  console.log("VisibleProject route",route);
  console.log("VisibleProject state",state);
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
    integrationOverview:state.integrationOverview,
    buildResult:state.buildResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IntegrationAction, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleApplication = connect(mapStateToProps, mapDispatchToProps)(Application);
export default VisibleApplication ;

