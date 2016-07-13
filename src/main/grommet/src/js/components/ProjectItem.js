import React, { Component } from 'react';
import ListItem from 'grommet/components/ListItem';
import Header from 'grommet/components/Header';

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
    console.log("ProjectItem project",project.project);
    hashHistory.push({pathname:`/projects/project`,query:{projectId:project.project._id}});
  }
  render () {
    let { project } = this.props;
    console.log("item props",project.project);
    let proj = project.project;
    return (
			<ListItem onClick={this.onClick.bind(this)} >
			    <Header justify="between">
                    <Title>
                        <ServiceBusiness />
                           <span>{proj.name} </span> 
                           <span>{proj._id}</span>
                    </Title>
                    <Box justify="between">
                        <span>{proj.apps.length} Application</span>
                        <span>Status:unknow</span>
                    </Box>
                    <Button  onClick={this.delete.bind(this,proj._id)}>Delete</Button>
                </Header>
			</ListItem>
			);
  }
  
}


export default ProjectItem;
