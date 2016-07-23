import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable  from 'immutable';
import ProjectItem from '../components/ProjectItem';
import * as integrationRecord from '../actions/integrationRecord';

//将state.counter绑定到props的counter
function mapStateToProps(state,props) {
  
  let proj = state.projectList.find((project, index, array)=>{
    if(project._id===props.projectId) {
      return true;
    }
  });

  let app4curProject = proj.apps.map(app=>{
    return app._id;
  });
  console.log("app4curProject",app4curProject);
  app4curProject = Immutable.fromJS(app4curProject);
  
  let latestRecord4apps=Immutable.Map();
  app4curProject.forEach(appid=>{
  	let curRecords = state.integrationRecords.filter(record=>{
      return appid===record.get('appId');
    });
    console.log("curRecords for project",curRecords.toJS());
    var latestRecord = Immutable.Map();
    let tmp = 0;
    curRecords.forEach(record=>{
     if(tmp<record.get('buildNo')) {
        latestRecord=record;
        tmp=record.get('buildNo');
      }
    
    });
    console.log("latest record for "+appid,latestRecord.toJS());
    latestRecord4apps = latestRecord4apps.set(appid,latestRecord);
  });

/*  let integrationRecords = state.integrationRecord.filter(record=>{
    
    return app4curProject.includes(record.get('appId'));
  });

  console.log("integrationRecords",integrationRecords.toJS());
  //find the latested record*/
  
  console.log("latestRecord4apps in VisibleProjectItem",latestRecord4apps.toJS());
  return {
    project: proj,
    latestRecord4apps:latestRecord4apps
  };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(integrationRecord, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
const VisibleProjectItem = connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
export default VisibleProjectItem ;
