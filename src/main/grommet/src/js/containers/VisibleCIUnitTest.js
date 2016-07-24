//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable  from 'immutable';
import CIUnitTest from '../components/CIUnitTest';
//import * as projectItem from '../actions/projectItem';

//将state.counter绑定到props的counter
function mapStateToProps(state,props) {
  let curRecord= state.integrationRecords.get(props.location.query.curRecordId);
  if(!curRecord) {
    curRecord = Immutable.Map({buildNo:-1});
  }
  return {
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
const VisibleCIUnitTest = connect(mapStateToProps, null)(CIUnitTest);
export default VisibleCIUnitTest ;
