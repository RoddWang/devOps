import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
//import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import QualityGateTitle from './QualityGateTitle';
import StatusRibbon from './StatusRibbon';
/*
import Tile from 'grommet/components/Tile';*/
/*import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CISecurity extends Component {

  transferRating(ratingNum) {
    let model={};
    if(ratingNum===1) {
      model.class="A";
      model.rating="A";
      return model;
    }else if(ratingNum===2) {
      model.class="B";
      model.rating="B";
      return model;
    }else if(ratingNum===3) {
      model.class="C";
      model.rating="C";
      return model;
    }else if(ratingNum===4) {
      model.class="B";
      model.rating="D";
      return model;
    }else if(ratingNum===5) {
      model.class="E";
      model.rating="E";
      return model;
    }
  }
  render () {
    let {integrationRecord} = this.props;

    if(integrationRecord.get('status')==='SPINNING') {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }

    if(integrationRecord.get('buildNo')===-1) {
      return (<span></span>);
    }

    let buildResult = integrationRecord.get('result').get('security_test').get('measures');
    let security_test_status=integrationRecord.get('result').get('code_review').get('status');
    let statusHead=(<StatusRibbon status="ok"  title="Code review passed"  />);
    
    if(security_test_status==='ERROR') {
      statusHead=(<StatusRibbon status="critical"  title="Code review failed" />);
    }else if(security_test_status==='WARNING') {
      statusHead=(<StatusRibbon status="warning"  title="Code review failed" />);
    }
    
    
    let errors = buildResult.filter( metric => {
      if(metric.get('condition')!==undefined) {
        if(metric.get('condition').get('level')!=='OK') {
          return true;
        }
      }
      return false;
    });

    let vulnerabilities=0;
    let new_vulnerabilities=0;
    let security_rating=0;
    

    buildResult.forEach((metric, index, array)=>{
      if(metric.get('metric')==='vulnerabilities') {
        vulnerabilities=+metric.get('value');
      }else if(metric.get('metric')==='new_vulnerabilities') {
        new_vulnerabilities=+metric.get('periods').get(0).get('value');
      }else if(metric.get('metric')==='security_rating') {
        security_rating=+metric.get('value');
        security_rating=this.transferRating(security_rating);
      }
     
     
    });

    let quality_gate = errors.map(errorMetric => {
      return (<QualityGateTitle title={errorMetric.get('metric').replace(/_/g," ")} errorMetric={errorMetric}/>);
    });
    return (
      <Box  pad={{"vertical":"small"}}>
          {statusHead}
          {quality_gate}
          <Box direction="row">
          <Header >
            Security
          </Header>
          <Box align="end">Powered by Sonar</Box>
          </Box>
          <Box  pad={{"vertical":"small","between":"small"}} direction="row" >
            
            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Overall</Heading>
              <Box >
                <Box direction="row" align="between" pad={{"between":"small","vertical":"small"}}>
                  <Box align="center" className="metric_parcel" >
                    <span>{vulnerabilities}</span>
                    <span>Vulnerabilities</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{new_vulnerabilities}</span>
                    <span>New vulnerabilities</span>
                  </Box>
                </Box>
                <Box>
                  <Box align="center" className="metric_parcel" style={{"width":"200px"}}>
                    <span className={"rating "+security_rating.class}>{security_rating.rating}</span>
                    <span>Security rating</span>
                  </Box>
                </Box>
              </Box>     
            </Box>

          </Box>


      </Box>
      );
  }
}
