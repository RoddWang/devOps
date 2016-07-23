import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Application from '../components/Application';
import * as IntegrationAction from '../actions/integration';

//将state.counter绑定到props的counter
function mapStateToProps(state,props) {
  console.log("VisibleApplication route",props);
  console.log("VisibleApplication state",state);
  let proj =  state.projectList.find(project => project._id==props.location.query.projectId);
  let app = null;
  for(let index in proj.apps) {
    if(proj.apps[index]._id==props.location.query.appId) {
      app=proj.apps[index];
      break;
    }
  }
  return {
    project: proj,
    application: app,
    integrationOverview:state.integrationOverview,
    buildResult:state.buildResult,
    integrationRecord:state.integrationRecords.get(props.location.query.curRecordId)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IntegrationAction, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleApplication = connect(mapStateToProps, mapDispatchToProps)(Application);
export default VisibleApplication ;

