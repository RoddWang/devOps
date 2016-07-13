import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewProject from '../components/NewProject';
import * as NewProjectActions from '../actions/newProject';

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    newProject: state.newProject
  };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(NewProjectActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleNewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject);
export default VisibleNewProject;
