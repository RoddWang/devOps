import React, { Component } from 'react';
import List from 'grommet/components/List';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Drag from 'grommet/components/icons/base/Drag';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Add from 'grommet/components/icons/base/Add';
import { Link } from 'react-router';
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
      return (<VisibleProjectItem  projectId={project._id} key={project._id} />);
    });

    return (
      <Box style={{"height":"100%"}} focusable={false} full="horizontal">
          <Box className="panel-header" focusable={false} justify="between" direction="row" pad="medium" align="center">
              <Box  align="center" >
                <Heading tag="h2" strong={true}  align="center">
                Projects
                </Heading>
              </Box>
              <Box  focusable={false} align="center" direction="row" justify="end">
                <Link to="/projects/list/new" >
                  <Anchor tag="span" icon={<Add />} label="New Project" />
                </Link>
                <Menu icon={<MenuIcon/>}>
                  <Anchor tag="span" label="manage" />
                </Menu>
                <Drag />
              </Box>
          </Box>
          <Box pad="small" className="project_list_panel">
			      <List  justify="center" className="project_list" align="center">
              {appTags}
			      </List>
          </Box>
          {this.props.children}
      </Box>
			);
  }
}


export default ProjectList;
