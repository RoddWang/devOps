import React, { Component } from 'react';
import Box from 'grommet/components/Box';
export default class StatusBar extends Component {

  render () {
    let {status,inProgress}=this.props;
    let className="status_meter ";
    if(status=="critical") {
      className=className+" error";
    }else if(status=="ok") {
      className=className+" success";
    }else{
      className=className+" initial";
    }

    if(inProgress) {
      className+=" in-progress";
    }

    return (
			<Box className="status-bar">
              <span>{this.props.title||'Default title'}</span>
              <Box  className={className} ><span></span></Box>
            </Box>
			);
  }
}
