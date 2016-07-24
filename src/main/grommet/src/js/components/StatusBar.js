import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';
//import Anchor from 'grommet/components/Anchor';
import Spinning from  'grommet/components/icons/Spinning';
export default class StatusBar extends Component {

  render () {
    let {status,inProgress}=this.props;
    //let className="status_meter ";
    let mystatus="unknown";
    if(status==="critical") {
      mystatus="critical";
    }else if(status==="ok") {
      mystatus="ok";
    }else if(status==="warning") {
      mystatus="warning";
    }


    
    let Bar = (<Status value={mystatus} size="small" />);
    if(inProgress) {
      Bar=(<Spinning/>);
    }

    
    return (
        <Box direction="row" align="center" className="status-bar"  >
          {Bar}
          {this.props.title}
        </Box>
			);
  }
}
