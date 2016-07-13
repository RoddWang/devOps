import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
//import Meter from 'grommet/components/Meter';
import QualityGateTitle from './QualityGateTitle';
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
    let {buildResult} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    let statusHead=(<Notification status="ok"  message="Quality Gate success"  />);
    //console.log('test unit error',buildResult.get('security_test').find(metric => metric.get('metric')==='test_errors').get('value'));
    let errors = buildResult.get('security_test').filter( metric => metric.get('status')!='OK');
    console.log("error",errors);
    if(errors.size>0) {
      statusHead=(<Notification status="critical"  message="Failed cause Quality Gate" />);
    }

    let vulnerabilities=0;
    let new_vulnerabilities=0;
    let security_rating=0;
    

    buildResult.get('security_test').forEach((metric, index, array)=>{
      if(metric.get('metric')==='vulnerabilities') {
        vulnerabilities=+metric.get('value');
      }else if(metric.get('metric')==='new_vulnerabilities') {
        new_vulnerabilities=+metric.get('periods').get(0).get('value');
      }else if(metric.get('metric')==='security_rating') {
        security_rating=+metric.get('value');
        security_rating=this.transferRating(security_rating);
      }
     
     
    });
    console.log("buildResult.get('security_test')",buildResult.get('security_test').toJS());
    let quality_gate = errors.map(errorMetric => {
      return (<QualityGateTitle title="New vulnerabilities" errorMetric={errorMetric}/>);
    });
    return (
      <Box  pad={{"vertical":"small"}}>
          {statusHead}
          {quality_gate}
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
