import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import CloudUpload from 'grommet/components/icons/base/CloudUpload';
import { Link } from 'react-router';

export default class NewProjectPrompt extends Component {

  render () {
    console.log("NewProjectPrompt",this.props);
    return (
			<Box focusable={false} justify="center" align="center">
			    <CloudUpload colorIndex="brand" size="large"/>
                <Button label="Create" primary={true} ><Link to="/newPorject"/></Button>
			</Box>
			);
  }
}
