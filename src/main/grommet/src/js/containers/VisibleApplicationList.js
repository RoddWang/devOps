//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ApplicationList from '../components/ApplicationList';
//import * as projectItem from '../actions/projectItem';

//project from customized props
function mapStateToProps(state,props) {
  console.log("VisibleApplicationList props",props);
  return {
    project: props.project
  };
}
/*//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(projectItem, dispatch);
}
*/
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleApplicationList = connect(mapStateToProps, null)(ApplicationList);
export default VisibleApplicationList ;
