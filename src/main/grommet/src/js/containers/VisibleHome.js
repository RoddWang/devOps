import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Immutable  from 'immutable';
import Home from '../components/Home';
import {refreshIntegrationByApp,refreshAllIntegrationRecord }  from '../actions/integrationRecord';
import {projectListAction}  from '../actions/projectList';
//import * as ProjectListActions from '../actions/projectList';
//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    projectList: state.projectList,
    allIntegrationRecords:state.integrationRecords
  };
}
//将action的所有方法绑定到props上
let integrationRecord={refreshIntegrationByApp,projectListAction,refreshAllIntegrationRecord };
function mapDispatchToProps(dispatch) {
  return bindActionCreators(integrationRecord, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default VisibleHome ;
