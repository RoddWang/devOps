import { combineReducers } from 'redux';
import projectList from './projectList';
import newProject from './newProject';
import layer from './layer';
import integrationOverview from './integrationOverview';
import buildResult from './buildResult';
import codeRepository from './codeRepository';
import integrationRecords from './integrationRecords';


//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  projectList,newProject,layer,integrationOverview,buildResult,codeRepository,integrationRecords
});
export default rootReducer;
