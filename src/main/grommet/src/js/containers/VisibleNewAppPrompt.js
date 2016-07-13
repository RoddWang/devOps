//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewAppPrompt from '../components/NewAppPrompt';

function mapStateToProps(state,customizedProps) {
  console.log("VisibleNewAppPrompt customized Props",customizedProps);
  return {
    project: state.projectList.find(project => project._id==customizedProps.projectId)
  };
}
/*//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(NewProjectActions, dispatch);
}
*/
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleNewAppPrompt = connect(mapStateToProps, null)(NewAppPrompt);
export default VisibleNewAppPrompt;
