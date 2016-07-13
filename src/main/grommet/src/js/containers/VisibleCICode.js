import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CICode from '../components/CICode';
import * as codeRepository from '../actions/codeRepository';
//将state.counter绑定到props的counter
function mapStateToProps(state) {

  return {
    buildResult:state.buildResult,
    codeRepository:state.codeRepository
  };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(codeRepository, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleCICode = connect(mapStateToProps, mapDispatchToProps)(CICode);
export default VisibleCICode ;
