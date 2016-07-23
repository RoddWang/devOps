import React, { Component } from 'react';
import ListItem from 'grommet/components/ListItem';
import Header from 'grommet/components/Header';
import Status from 'grommet/components/icons/Status';
import Integration from 'grommet/components/icons/base/Integration';
import Deployment  from 'grommet/components/icons/base/Deployment';
import Monitor from 'grommet/components/icons/base/Monitor';
import Article  from 'grommet/components/icons/base/Article';
import CaretDown   from 'grommet/components/icons/base/CaretDown';
import CaretNext  from 'grommet/components/icons/base/CaretNext';
//import Anchor from 'grommet/components/Anchor';
import Spinning from  'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';

import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

import ServiceBusiness from 'grommet/components/icons/base/ServiceBusiness';

import { hashHistory } from 'react-router';

class ProjectItem extends Component {

  delete (_id,e) {
    let { projectDelete } = this.props;
    projectDelete(_id);
   //console("delete event",e);
    e.stopPropagation();// stop event Propagate, in case onClick will be invoked
  }
  onClick (e) {
    let {project} = this.props;
    console.log("ProjectItem project",project);
    hashHistory.push({pathname:`/projects/project`,query:{projectId:project._id}});
  }
  componentDidMount () {
    this.isHiden=true;
    let {refreshIntegrationByApp,projectId} = this.props;
    refreshIntegrationByApp(projectId);
  }
  toCI(appId,recordId) {
    let {project,latestRecord4apps} = this.props;
    hashHistory.push({pathname:`/projects/application`,query:{projectId:project._id,appId:appId,curRecordId:recordId}});
  }
  render () {
    let { project ,latestRecord4apps} = this.props;
    console.log("integrationRecords render",latestRecord4apps.toJS());
    
    let appList = project.apps.map((app)=>{
      let curRecord = latestRecord4apps.get(app._id);
      
      let appStatusIcon=(<Status value="unknown" size="small"/>);
      let ciStatusIcon=(<Status value="unknown" size="small"/>);
      let cdStatusIcon=(<Status value="unknown" size="small"/>);
      let cmStatusIcon=(<Status value="unknown" size="small"/>);
      let caStatusIcon=(<Status value="unknown" size="small"/>);
      if(curRecord.size!=0) {
        if(curRecord.get("status")=='SPINNING') {
          appStatusIcon=(<Spinning/>);
          ciStatusIcon=(<Spinning/>);
        }else if(curRecord.get("status")=='SUCCESS') {
          appStatusIcon=(<Status value="ok" size="small"/>);
          ciStatusIcon=(<Status value="ok" size="small"/>);
        }else if(curRecord.get("status")=='FAILURE') {
          appStatusIcon=(<Status  value="critical" size="small"/>);
          ciStatusIcon=(<Status  value="critical" size="small"/>);
        }else{
          appStatusIcon=(<Status value="warning" size="small"/>);
          ciStatusIcon=(<Status value="warning" size="small"/>);
        }
      }
      return (
        <Box full="horizontal" key={app._id} justify="between" direction="row" className="all-titles">
          <Box direction="row" className="app--name" >
            {appStatusIcon}
            <span>{app.applicationName}</span>
          </Box>
          <Box direction="row">
            <Box direction="row" className="ci--title" onClick={this.toCI.bind(this,app._id,curRecord.get('_id'))} >
                {ciStatusIcon}
                <Integration/>
                <span>Integration</span>
            </Box>
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
        );
    });
/*    console.log("is hiden",this.state);
    let hidenTag=(<Anchor icon={<CaretDown />} tag="span" onClick={this.toggle.bind(this)}>hide</Anchor>);
    if(hide){//do not hiden
      hidenTag=(<Anchor icon={<CaretNext />} tag="span" onClick={this.toggle.bind(this)}>show</Anchor>);
    }*/
    return (
			<ListItem align="start" direction="column" pad="small" className="project_item project_status ok">
        <Heading strong={true}  tag="h3" >
          {project.name} 
        </Heading>
        {appList}
      </ListItem>
    );
  }
  
}


export default ProjectItem;
