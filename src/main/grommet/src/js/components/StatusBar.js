import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';
import Anchor from 'grommet/components/Anchor';
import Spinning from  'grommet/components/icons/Spinning';
export default class StatusBar extends Component {

  render () {
    let {status,inProgress}=this.props;
    //let className="status_meter ";
    let mystatus="unknown";
    if(status=="critical") {
      mystatus="critical";
    }else if(status=="ok") {
      mystatus="ok";
    }else if(status=="warning") {
      mystatus="warning";
    }


    let Bar = (<Anchor href="" icon={<Status value={mystatus} size="small" />} label={this.props.title} onClick={this.props.onClick} />);
    if(inProgress) {
      Bar=(<Anchor href="" icon={<Spinning/>} label={this.props.title} onClick={this.props.onClick} />);
    }

    
    return (
        <Box className="status-bar"  >
          {Bar}
        </Box>
			);
  }
}
