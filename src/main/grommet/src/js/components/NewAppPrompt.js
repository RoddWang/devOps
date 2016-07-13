import React, { Component } from 'react';
//import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import CloudUpload from 'grommet/components/icons/base/CloudUpload';
import Heading from 'grommet/components/Heading';
import { Link } from 'react-router';
//import { hashHistory } from 'react-router';

export default class NewAppPrompt extends Component {
/*  goCreate () {
    let {projectId} = this.props;
    hashHistory.push({pathname:`/projects/project/newApp`,query:{projectId:projectId}});
  }*/
  render () {
    let {project} = this.props;
    console.log("NewAppPrompt this.props" ,this.props);
    console.log("prompt ",this.props);
    return (
			<Box focusable={false} justify="center" align="center">
			    <Heading tag="h2" align="center">
                 No application found in project:{project.name}
                </Heading>
			    <span></span>
			    <CloudUpload colorIndex="brand" size="large"/>
                <Link to={{pathname:'/projects/project/new',query:{projectId:project._id}}}>
                   <Anchor tag="span"  primary={true} >Create</Anchor>
                </Link>
			</Box>
			);
  }
}
