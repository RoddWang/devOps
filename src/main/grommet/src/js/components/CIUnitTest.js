import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
//import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Meter from 'grommet/components/Meter';
import QualityGateTitle from './QualityGateTitle';
import StatusRibbon from './StatusRibbon';
export default class CIUnitTest extends Component {
  git2https(giturl) {
    var https = giturl.replace(':','/').replace("git@","https://").replace(".git","");
    console.log(https);
    return https;
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
    
    let buildResult = integrationRecord.get('result').get('unit_test').get('measures');
    let unit_test_status=integrationRecord.get('result').get('unit_test').get('status');
    let statusHead=(<StatusRibbon status="ok"  title="Quality Gate Success"  />);
    
    if(unit_test_status==='ERROR') {
      statusHead=(<StatusRibbon status="critical" ><span>Quality Gate Failed, please update the <a  target="_blank" href={this.git2https(integrationRecord.get('repositoryUrl'))}>Code</a></span> </StatusRibbon>);
    }else if(unit_test_status==='WARNING') {
      statusHead=(<StatusRibbon status="critical" ><span>Quality Gate Warning, please update the <a target="_blank" href={this.git2https(integrationRecord.get('repositoryUrl'))}>Code</a></span> </StatusRibbon>);
    }
    
    console.log('unit test',buildResult.toJS());
    let errors = buildResult.filter( metric => {

      if(metric.get('condition')) {
        
        if(metric.get('condition').get('level')!=='OK') {
          console.log("metric.get('condition')",metric.get('condition').toJS());
          return true;
        }
      }
      return false;
    });

    let tests= NaN;
    let skipped_tests= NaN;
    let test_failures= NaN;
    let test_errors= NaN;
    
    let coverage=NaN;
    let line_coverage=NaN;
    let branch_coverage=NaN;
    let new_coverage=NaN;
    let new_line_coverage=NaN;
    let new_branch_coverage=NaN;

    
    console.log("tests",tests);
    buildResult.forEach((metric, index, array)=>{
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
      return (<QualityGateTitle key={errorMetric.get('metric')+"unittest"} title={errorMetric.get('metric').replace(/_/g," ")} errorMetric={errorMetric} needFix={true}/>);
    });
    console.log('new coverage',new_coverage,new_line_coverage,new_branch_coverage);
    return (
    <Box justify="between">
      <Box pad={{"vertical":"small"}}>
        {statusHead}
        <Box direction="row">
          {quality_gate}
        </Box>
        <Box direction="row">
          <Header >
            Unit Test 
          </Header>
          <Box align="end">Powered by Jenkins</Box>
        </Box>
        
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
      
    </Box>
    );
  }
}
