//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CI from '../components/CI';
//import * as projectItem from '../actions/projectItem';

//将state.counter绑定到props的counter
function mapStateToProps(state,route) {
  console.log("VisibleProject CI route",route);
  console.log("VisibleProject CI state",state);
  let proj =  state.projectList.find(project => project._id==route.location.query.projectId);
  for(let index in proj.apps) {
    if(proj.apps[index]._id==route.location.query.appId) {
      var app=proj.apps[index];
    }
  }
  return {
    project: proj,
    application: app,
    buildResult:state.buildResult
  };
}
/*//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(projectItem, dispatch);
}
*/
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleCI = connect(mapStateToProps, null)(CI);
export default VisibleCI ;
