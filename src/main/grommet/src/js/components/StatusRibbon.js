import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';
export default class StatusRibbon extends Component {

  render () {
    let {status}=this.props;
    var className="status--robbin" ;
    let mystatus="unknown";
    if(status==="critical") {
      className=className+" status--robbin--critical";
      mystatus="critical";
    }else if(status==="ok") {
      className=className+" status--robbin--ok";
      mystatus="ok";
    }else if(status==="warning") {
      className=className+" status--robbin--warning";
      mystatus="warning";
    }

    let Bar = (<Status value={mystatus} size="medium" />);
    
    return (
        <Box direction="row" align="center" className={className}  >
          {Bar}
          {this.props.children||this.props.title}
        </Box>
			);
  }
}
