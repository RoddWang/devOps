import React, { Component } from 'react';
//import App from 'grommet/components/App';
//import Split from 'grommet/components/Split';
//import Sidebar from 'grommet/components/Sidebar';
//import Menu from 'grommet/components/Menu';
//import Anchor from 'grommet/components/Anchor';
//import Header from 'grommet/components/Header';
//import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';

import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

import { Link } from 'react-router';
import Next from 'grommet/components/icons/base/Next';
import StatusBar from './StatusBar';
import BarSeparater from './BarSeparater';

export default class Application extends Component {

  componentDidMount() {

    let { queryAllIntegrationStatus ,queryIntegrationResult,project ,application } = this.props;
    queryAllIntegrationStatus(project._id,application._id);
    this.timer=setInterval(function () {
      console.log("Interval running");
      if(this.props.integrationOverview.size>0) {
        queryIntegrationResult(project._id,application._id,this.props.integrationOverview.get("lastBuild").number);
      }
      
    }.bind(this),10000);

  }

  componentDidUpdate () {
    
    let {project, application,integrationOverview,queryIntegrationResult,buildResult} = this.props;
    console.log("componentWillReceiveProps",(buildResult.size==0)&&(integrationOverview.size>0));
    console.log("componentWillReceiveProps",buildResult,integrationOverview);
    if((buildResult.size==0)&&(integrationOverview.size>0)) {// only call at initial 
      console.log("componentWillReceiveProps integrationOverview",integrationOverview);
      queryIntegrationResult(project._id,application._id,integrationOverview.get("lastBuild").number);
    }
  }

  componentWillUnmount () {
    console.log("clearInterval timer");
    clearInterval(this.timer);
    let {clearAllIntegrationStatus,clearIntegrationResult} = this.props;
    clearAllIntegrationStatus();
    clearIntegrationResult();
  }

  render () {
    let {project, application,buildResult} = this.props;
    console.log("application props",this.props);   
    return (
    	<Box>
            <Box focusable={false} justify="between" direction="row" align="center">
              <Box  align="center" direction="row" >
                <Link to="/projects/list">
                  <Anchor tag="span" primary={true} reverse={true} icon={<Next />} label="projects" />
                </Link>
                <Link to={{pathname:'/projects/project',query:{projectId:project._id}}}>
                  <Anchor tag="span" primary={true} reverse={true} icon={<Next />} label={project.name} />
                </Link>
                <Anchor tag="span" primary={true} disabled={true} reverse={true} icon={<Next />} label={application.applicationName} />
              </Box>
              <Box  focusable={false} align="start" direction="row" justify="end"/>
            </Box>
            <Box focusable={false} justify="between" direction="row"  align="center">
              <Headline strong={true}>{application.applicationName}</Headline>
              <Box direction="row"  className="statusBarList"> 
                 <Link activeClassName="active" to={{pathname:"/projects/application/CI",query:{projectId:project._id,appId:application._id}}}>
                   <StatusBar status={buildResult.get('integrationStatus')} inProgress={buildResult.get('isprogress')} title="Continious Integration"/>
                 </Link>
                 <BarSeparater/>
                 <StatusBar status="initial" inProgress={buildResult.get('isprogress')} title="Continious Deployment"/>
                 <BarSeparater/>
                 <StatusBar status="initial" inProgress={buildResult.get('isprogress')} title="Continious Monitoring"/>
                 <BarSeparater/>
                 <StatusBar status="initial" inProgress={buildResult.get('isprogress')} title="Continious Assessment"/>
              </Box>
            </Box>
            {this.props.children}
        </Box>
			);
      
  }


}
