import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectList from '../components/ProjectList';
import * as ProjectListActions from '../actions/projectList';

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    projectList: state.projectList
  };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps",ProjectListActions);
  return bindActionCreators(ProjectListActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectList);
export default VisibleProjectList ;
