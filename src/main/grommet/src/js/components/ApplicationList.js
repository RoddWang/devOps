import React, { Component } from 'react';
import List from 'grommet/components/List';
//import SearchBox from '../components/SearchBox';
import ListItem from 'grommet/components/ListItem';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Configuration from 'grommet/components/icons/base/Configuration';
import { hashHistory } from 'react-router';

class ApplicationList extends Component {


  itemClick (appid) {
    let {project} = this.props;
    console.log("ProjectItem project",project.project);
    hashHistory.push({pathname:`/projects/application`,query:{projectId:project._id,appId:appid}});
  }
  render () {
    let {project} = this.props;
    console.log("projectList ---",this.props);

    let content = project.apps.map(function(app) {
      return (
        <ListItem key={app._id} onClick={this.itemClick.bind(this,app._id)} >
          <Box justify="between" direction="row" full="horizontal" align="center">
            <span>{app.applicationName}</span>
            <span>{app.scm.scmType}:{app.scm.repoUrl}</span>
            <Menu icon={<Configuration />} label="Label">
              <Anchor href="#" className="active">
               First
              </Anchor>
            </Menu>
          </Box>
        </ListItem>
      );
    }.bind(this));
    return (
      <Box focusable={false} full="horizontal">
          <List focusable={false} selectable={true} justify="center" align="center">
              {content}
			    </List>
      </Box>
			);
  }
}


export default ApplicationList;
