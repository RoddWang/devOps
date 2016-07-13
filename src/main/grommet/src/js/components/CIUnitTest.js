import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Meter from 'grommet/components/Meter';
import QualityGateTitle from './QualityGateTitle';
//import Immutable  from 'immutable';
/*
import Anchor from 'grommet/components/Anchor';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CIUnitTest extends Component {

  render () {
    let {buildResult} = this.props;

    if(buildResult.get('isprogress')) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    console.log("UnitTest",buildResult.toJS());

    
    let statusHead=(<Notification status="ok"  message="All unit test successfully"  />);
    //console.log('test unit error',buildResult.get('unit_test').find(metric => metric.get('metric')==='test_errors').get('value'));
    let errors = buildResult.get('unit_test').filter( metric => metric.get('status')!='OK');
    console.log("error",errors);
    if(errors.size>0) {
      console.log("errors",errors.toJS());
      //let errorCount = buildResult.get('unit_test').find(metric => metric.get('metric')==='test_errors').get('value');
      statusHead=(<Notification status="critical"  message="Failed cause Quality Gate" />);
    }
    let tests= 0;
    let skipped_tests= 0;
    let test_failures= 0;
    let test_errors= 0;
    
    let coverage=0;
    let line_coverage=0;
    let branch_coverage=0;
    let new_coverage=0;
    let new_line_coverage=0;
    let new_branch_coverage=0;

    
    console.log("tests",tests);
    buildResult.get('unit_test').forEach((metric, index, array)=>{
      let metricName = metric.get('metric');
      if(metricName==='tests') {
        tests=+metric.get('value');
      }else if(metricName==='skipped_tests') {
        skipped_tests=+metric.get('value');
      }else if(metricName==='test_failures') {
        test_failures=+metric.get('value');
      }else if(metricName==='test_errors') {
        test_errors=+metric.get('value');
      }else if(metricName==='coverage') {
        coverage=+metric.get('value');
      }else if(metricName==='line_coverage') {
        line_coverage=+metric.get('value');
      }else if(metricName==='branch_coverage') {
        branch_coverage=+metric.get('value');
      }else if(metricName==='new_coverage') {
        new_coverage=+metric.get('periods').get(0).get('value');
        new_coverage = new_coverage.toFixed(2);
      }else if(metricName==='new_line_coverage') {
        new_line_coverage=+metric.get('periods').get(0).get('value');
        new_line_coverage = new_line_coverage.toFixed(2);
      }else if(metricName==='new_branch_coverage') {
        new_branch_coverage=+metric.get('periods').get(0).get('value');
        new_branch_coverage = new_branch_coverage.toFixed(2);
      }

    });
    let quality_gate = errors.map(errorMetric => {
      return (<QualityGateTitle title="Coverage on new code" errorMetric={errorMetric} needFix={true}/>);
    });
    console.log('new coverage',new_coverage,new_line_coverage,new_branch_coverage);
    return (
      <Box pad={{"vertical":"small"}}>
        {statusHead}
        <Box direction="row">
        {quality_gate}

        </Box>
        <Header >
            Unit Test
        </Header>
        
        <Box direction="row" justify="center" pad={{"between":"large"}}>
          <Box >
            <Heading strong={true} tag="h6">
              Test Result
            </Heading>
            <Meter size="medium" total={tests} stacked={true} type="circle"  max={tests}  series={[
              {"label": "Success", "value": tests-skipped_tests-test_failures-test_errors ,"colorIndex":"ok"},
              {"label": "Skipped", "value": skipped_tests ,"colorIndex":"graph-4"},
              {"label": "Failures", "value": test_failures,"colorIndex":"critical"},
              {"label": "Error", "value": test_errors ,"colorIndex":"critical"}
            ]}  />
          </Box>
          <Box>
            
            <Heading strong={true} tag="h6">
             Test Coverage
            </Heading>
            <span>Coverage</span>
            <Meter value={coverage} units="%" />
            <span>Line Coverage</span>
            <Meter value={line_coverage} units="%" />
            <span>Condition Coverage</span>
            <Meter value={branch_coverage} units="%"  min={{"value": 0, "label": "0%"}} max={{"value": 100, "label": "100%"}}/>
          </Box>
          <Box>
            <Heading strong={true} tag="h6">
             Test Coverage on new code
            </Heading>
            <span>Coverage on new code</span>
            <Meter value={new_coverage} units="%" />
            <span>Line coverage on new code</span>
            <Meter value={new_line_coverage} units="%" />
            <span>Condition coverage on new code</span>
            <Meter value={new_branch_coverage} units="%"  min={{"value": 0, "label": "0%"}} max={{"value": 100, "label": "100%"}}/>
          </Box>
        </Box>
      </Box>
    );
  }
}
