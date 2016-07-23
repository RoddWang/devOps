import React, { Component } from 'react';
//import App from 'grommet/components/App';
//import Split from 'grommet/components/Split';
//import Sidebar from 'grommet/components/Sidebar';
//import Menu from 'grommet/components/Menu';
//import Anchor from 'grommet/components/Anchor';
//
//import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Status from 'grommet/components/icons/Status';
import Integration from 'grommet/components/icons/base/Integration';
import Deployment  from 'grommet/components/icons/base/Deployment';
import Monitor from 'grommet/components/icons/base/Monitor';
import Article  from 'grommet/components/icons/base/Article';
import Previous  from 'grommet/components/icons/base/Previous';
import Headline from 'grommet/components/Headline';

import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

import { Link } from 'react-router';
import Next from 'grommet/components/icons/base/Next';
import StatusBar from './StatusBar';
import BarSeparater from './BarSeparater';
import { hashHistory } from 'react-router';
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
  
  back() {
    hashHistory.goBack();
  }
  render () {
    let {project, application,buildResult,integrationRecord} = this.props;
    console.log("application props",this.props);  
     // let appStatusIcon=(<Status value="unknown" size="small"/>);
      let ciStatusIcon=(<Status value="unknown" size="small"/>);
      let cdStatusIcon=(<Status value="unknown" size="small"/>);
      let cmStatusIcon=(<Status value="unknown" size="small"/>);
      let caStatusIcon=(<Status value="unknown" size="small"/>);
      if(integrationRecord.size!=0) {
        if(integrationRecord.get("status")=='SPINNING') {
        //  appStatusIcon=(<Spinning/>);
          ciStatusIcon=(<Spinning/>);
        }else if(integrationRecord.get("status")=='SUCCESS') {
       //   appStatusIcon=(<Status value="ok" size="small"/>);
          ciStatusIcon=(<Status value="ok" size="small"/>);
        }else if(integrationRecord.get("status")=='FAILURE') {
        //  appStatusIcon=(<Status  value="critical" size="small"/>);
          ciStatusIcon=(<Status  value="critical" size="small"/>);
        }else{
         // appStatusIcon=(<Status value="warning" size="small"/>);
          ciStatusIcon=(<Status value="warning" size="small"/>);
        }
      }
/*       <Box focusable={false} justify="between" direction="row" align="center">
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
            </Box>*/

    return (
    	<Box>

          <Box className="panel-header" focusable={false} justify="between" direction="row" pad="medium" align="center">
            <Box  align="center" onClick={this.back}>
              <Heading tag="h2" strong={true}  align="center">
              <Previous />
              {application.applicationName}
              </Heading>
            </Box>
            <Box direction="row" className="continuous-title">
             
              <Box direction="row">
                <Link activeClassName="continuous-title--active" to={{pathname:"/projects/application/CI",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <Box direction="row" className="ci--title" >
                    {ciStatusIcon}
                    <Integration/>
                    <span>Integration</span>
                  </Box>
                </Link> 
              <Box direction="row" className="ci--title">
                {cdStatusIcon}
                <Deployment/>
                <span>Deployment</span>
              </Box>
              <Box direction="row" className="ci--title">
                {cmStatusIcon}
                <Monitor/>
                <span>Monitoring</span>
              </Box>
              <Box direction="row" className="ci--title">
                {caStatusIcon}
                <Article/>
                <span>Assessment</span>
              </Box>
            </Box>
          </Box>
          </Box>
            <Box focusable={false} justify="between" direction="row"  align="center">
              <Headline strong={true}>{application.applicationName}</Headline>
              <Box direction="row"  className="statusBarList"> 
                 <Link activeClassName="active" to={{pathname:"/projects/application/CI",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
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
