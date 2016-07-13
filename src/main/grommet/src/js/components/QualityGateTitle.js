import React, { Component } from 'react';
import Box from 'grommet/components/Box';
/*
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class QualityGateTitle extends Component {

  render () {
    let op="";
    let {errorMetric,title,needFix,units} = this.props;
    if(errorMetric.get('condition').get('op')==='LT') {
      op="<";
    }else if(errorMetric.get('condition').get('op')==='GT') {
      op=">";
    }
    let rawData=+errorMetric.get('condition').get('actual');
    if(needFix) {
      rawData=rawData.toFixed(2);
    }
    let unit="";
    if(units) {
      unit=units;
    }
    return (<Box>
        <span>since previous version</span>
        <Box direction="row" pad={{"between":"small"}}>
          <Box className="alert_ERROR overview-gate-condition-value" colorIndex="critical" align="center" justify="center">
             {rawData+unit}
          </Box>
          <Box  className="quality_gate_tips">
            <span>{title}</span>
            <span>{op+errorMetric.get('condition').get('error')}</span>
          </Box>
        </Box>
      </Box>);
  }
}
