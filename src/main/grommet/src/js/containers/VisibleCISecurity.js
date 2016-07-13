//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CISecurity from '../components/CISecurity';
//import * as projectItem from '../actions/projectItem';

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    buildResult:state.buildResult
  };
}
/*//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(projectItem, dispatch);
}
*/
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleCISecurity = connect(mapStateToProps, null)(CISecurity);
export default VisibleCISecurity ;
