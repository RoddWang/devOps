import '../scss/index.scss';

import { Router, Route, hashHistory ,IndexRedirect } from 'react-router';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import DevOpsApp from './components/DevOpsApp';
import Setting from './components/Setting';
import ProjectPanel from './components/ProjectPanel';
//dddddimport Project from './components/Project';
import VisibleNewApplication from './containers/VisibleNewApplication';
import VisibleProjectList from './containers/VisibleProjectList';
import VisibleNewProject from './containers/VisibleNewProject';
import VisibleProject from './containers/VisibleProject';
import VisibleApplication from './containers/VisibleApplication';
import VisibleCI from './containers/VisibleCI';
import VisibleCIOverview from './containers/VisibleCIOverview';
import VisibleCICode from './containers/VisibleCICode';
import VisibleCIUnitTest from './containers/VisibleCIUnitTest';
import VisibleCICodeReview from './containers/VisibleCICodeReview';
import VisibleCISecurity from './containers/VisibleCISecurity';
import VisibleCIBuild from './containers/VisibleCIBuild';
const store = configureStore();


class Main extends Component {
  render () {
    return (
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={DevOpsApp}>
        <Route path="projects" component={ProjectPanel} >
            <IndexRedirect to="/projects/list" />
            <Route path="list" component={VisibleProjectList}>
                <Route path="new" component={VisibleNewProject}/>
            </Route>
            <Route path="project" component={VisibleProject}>
                <Route path="newApp" component={VisibleNewApplication}/>
            </Route>
            <Route path="application" component={VisibleApplication}>
              <Route path="CI" component={VisibleCI}>
                 <Route path="overview" component={VisibleCIOverview}/>
                 <Route path="code" component={VisibleCICode}/>
                 <Route path="unittest" component={VisibleCIUnitTest}/>
                 <Route path="codereview" component={VisibleCICodeReview}/>
                 <Route path="security" component={VisibleCISecurity}/>
                 <Route path="build" component={VisibleCIBuild}/>
              </Route>
            </Route>
        </Route>
        <Route path="setting" component={Setting}/>
    </Route>
  </Router>
  </Provider>
   );
  }
};


let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);
console.log(Main);
document.body.classList.remove('loading');
