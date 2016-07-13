import React, { Component } from 'react';
import List from 'grommet/components/List';
import Box from 'grommet/components/Box';
import SearchBox from '../components/SearchBox';
//import ProjectItem from '../components/ProjectItem';
import VisibleProjectItem from '../containers/VisibleProjectItem';
class ProjectList extends Component {

  componentDidMount() {

    let { projectListAction } = this.props;
    projectListAction();

  }

  render () {
    let {projectList} = this.props;
    console.log("projectList ---",this.props);
    var appTags = projectList.map(function(project,index) {
      return (<VisibleProjectItem  project={project} key={project._id} />);
    });

    return (
      <Box focusable={false} full="horizontal">
          <Box focusable={false} justify="between" direction="row" pad="small" align="center">
              <Box  align="center" >Project</Box>
              <SearchBox/>
          </Box>
			    <List focusable={false} selectable={true} justify="center" align="center">
              {appTags}
			    </List>
          {this.props.children}
      </Box>
			);
  }
}


export default ProjectList;
