import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Label from 'grommet/components/Label';
/*import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CIOverView extends Component {

  render () {
    let {buildResult} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    console.log("buildResult.get('barStatus').get('unit_test').get('status')",buildResult.get('barStatus').get('unit_test').get('status'));
    return (
			<Box pad={{"vertical":"small"}}>
			  <Tiles flush={false} justify="start" colorIndex="light-2" full="horizontal">
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('code').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('unit_test').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('functional_test').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('code_review').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('security').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('performance').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
          <Tile colorIndex="light-1">
              <Box direction="row" align="center">
                <Status value={buildResult.get('barStatus').get('build').get('status')}/>
                <Label >
                  Code
                </Label>
              </Box>
          </Tile>
        </Tiles>
			</Box>
			);
  }
}
