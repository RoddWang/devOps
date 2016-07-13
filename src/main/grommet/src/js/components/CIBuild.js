import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';

/*import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CIBuild extends Component {

  reBuild(project,application) {
    let {build}=this.props;
    build(project._id,application._id);
    console.log("build project",project);
    console.log("build application",application);
    console.log("this,props",this.props);
  }
  render () {
    let {buildResult} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    let {project,application} = this.props;
    if(buildResult.get("barStatus").get('build').get('status')==='ok') {
      return (<Box align="center">
          <Heading align="center" strong={true} tag="h2">Build successfully</Heading>
          <Button ref="rebuild" label="ReBuild" primary={true} onClick={this.reBuild.bind(this,project,application)} />
      </Box>);
    }

    console.log("buildResult.get(barStatus).get(status)",buildResult.get("barStatus").get('build').toJS());
    return (
			<span>
			    CIBuild
			</span>
			);
  }
}
