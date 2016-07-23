import React, { Component } from 'react';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import { Link } from 'react-router';
import Box from 'grommet/components/Box';
import UserSettings from 'grommet/components/icons/base/UserSettings';
import AppIcon from 'grommet/components/icons/base/App';

export default class DevOpsApp extends Component {

  render () {
    return (
			<App inline={true} centered={false}>
			    <Split fixed={false} flex="right" separator={true}>
			        <Sidebar colorIndex="neutral-1">
                        <Header pad={{horizontal: "medium"}}>DevOps</Header>
                        <Menu primary={true}>
                            <Link activeClassName="active" to="/projects" > 
                                <Anchor  tag="span" icon={<AppIcon />} label="Project" />
                            </Link>
                            <Link activeClassName="active" to="/setting">
                                <Anchor  tag="span" icon={<UserSettings />} label="Setting" />
                            </Link>
                        </Menu>
                    </Sidebar>
                    <Box  focusable={false} direction="column"  full={true}>
                       {this.props.children}
                    </Box>
			    </Split>
			</App>
			);
  }


}
