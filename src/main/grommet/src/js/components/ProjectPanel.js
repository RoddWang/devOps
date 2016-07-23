import React, { Component } from 'react';
import Box from 'grommet/components/Box';

export default class ProjectPanel extends Component {
  render () {
    return (
          <Box full={true} className="project_panel">
          {this.props.children}
          </Box>
			
			);
  }
}
