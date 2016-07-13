import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewApplication from '../components/NewApplication';
import * as ApplicationAction from '../actions/applicationMgr';

function mapStateToProps(state,route) {
  console.log("VisibleNewApplication route",route);
  return {
    project: state.projectList.find(project => project._id==route.location.query.projectId),
    layer:state.layer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ApplicationAction, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleNewApplication = connect(mapStateToProps, mapDispatchToProps)(NewApplication);
export default VisibleNewApplication;
