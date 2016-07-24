//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable  from 'immutable';
import CI from '../components/CI';
//import * as projectItem from '../actions/projectItem';

//将state.counter绑定到props的counter
function mapStateToProps(state,props) {
  console.log("VisibleProject CI props",props);
  console.log("VisibleProject CI state",state);
  let proj =  state.projectList.find(project => project._id==props.location.query.projectId);
  for(let index in proj.apps) {
    if(proj.apps[index]._id==props.location.query.appId) {
      var app=proj.apps[index];
    }
  }
  let curRecord= state.integrationRecords.get(props.location.query.curRecordId);
  if(!curRecord) {
    curRecord = Immutable.Map({buildNo:-1});
  }

  return {
    project: proj,
    application: app,
    buildResult:state.buildResult,
    integrationRecord:curRecord
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
