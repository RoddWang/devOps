import React, { Component } from 'react';
//import { hashHistory } from 'react-router';

import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Add from 'grommet/components/icons/base/Add';
import { Link } from 'react-router';

import Next from 'grommet/components/icons/base/Next';


import VisibleNewAppPrompt from '../containers/VisibleNewAppPrompt';
import VisibleApplicationList from '../containers/VisibleApplicationList';
class Project extends Component {

/*  componentDidMount() {

    let { project } = this.props;
    if(project.apps.length==0){
      hashHistory.push(path{"newAppPrompt"});
    }

  }*/

  render () {
    console.log("project props",this.props);
    let { project } = this.props;
    let content;
    if(project.apps.length==0) {
      content= (<VisibleNewAppPrompt projectId={project._id}/>);
    }else{
      content = (<VisibleApplicationList project={project}/>);
    }
    return (
      <div>
        <Box focusable={false} justify="between" direction="row" align="center">
              <Box  align="center" direction="row" >
                <Link to="/projects/list">
                  <Anchor tag="span" primary={true} reverse={true} icon={<Next />} label="projects" />
                </Link>
                <Anchor tag="span" primary={true} disabled={true} reverse={true} icon={<Next />} label={project.name} />
              </Box>
              <Box  focusable={false} align="center" direction="row" justify="end">
                <Link to={{pathname:'/projects/project/newApp',query:{projectId:project._id}}}>
                  <Anchor tag="span" icon={<Add />} label="Add App" />
                </Link>
                <Search inline={true} iconAlign="start" placeHolder="Project Name" />
              </Box>
          </Box>
        {content}
        {this.props.children}
      </div>
    );
  }

  
  
}


export default Project;
