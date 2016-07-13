import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
/*import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CIFunctionalTest extends Component {

  render () {
    let {buildResult} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    return (
			<span>
			    CIFunctionalTest
			</span>
			);
  }
}
