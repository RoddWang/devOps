import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
//import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Meter from 'grommet/components/Meter';
import QualityGateTitle from './QualityGateTitle';
import StatusRibbon from './StatusRibbon';
export default class CICodeReview extends Component {

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

    let buildResult = integrationRecord.get('result').get('code_review').get('measures');
    let code_review_status=integrationRecord.get('result').get('code_review').get('status');
    let statusHead=(<StatusRibbon status="ok"  title="Code review passed"  />);
    
    if(code_review_status==='ERROR') {
      statusHead=(<StatusRibbon status="critical"  title="Code review failed" />);
    }else if(code_review_status==='WARNING') {
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

    let files=NaN;
    let ncloc=NaN;
    let classes=NaN;
    let functions=NaN;
    let statements=NaN;
    let public_api=NaN;
   // let lines=0;
    let blocker_violations=NaN;
    let critical_violations=NaN;
    let major_violations=NaN;
    let minor_violations=NaN;
    let info_violations=NaN;

    let bugs=NaN;
    let new_bugs=NaN;
    let reliability_rating=NaN;

    let comment_lines=NaN;
    let comment_lines_density=NaN;
    let public_documented_api_density=NaN;
    let public_undocumented_api=NaN;
    //let commented_out_code_lines=NaN;
    

    let duplicated_blocks=NaN;
    let duplicated_files=NaN;
    let duplicated_lines=NaN;
    let duplicated_lines_density=NaN;
    

    buildResult.forEach((metric, index, array)=>{
      console.log("code_review metric",metric.toJS());
      if(metric.get('metric')==='files') {
        files=+metric.get('value');
      }else if(metric.get('metric')==='ncloc') {
        ncloc=+metric.get('value');
      }else if(metric.get('metric')==='classes') {
        classes=+metric.get('value');
      }else if(metric.get('metric')==='functions') {
        functions=+metric.get('value');
      }else if(metric.get('metric')==='statements') {
        statements=+metric.get('value');
      }else if(metric.get('metric')==='public_api') {
        public_api=+metric.get('value');
      }else if(metric.get('metric')==='blocker_violations') {
        blocker_violations=+metric.get('value');
      }else if(metric.get('metric')==='critical_violations') {
        critical_violations=+metric.get('value');
      }else if(metric.get('metric')==='major_violations') {
        major_violations=+metric.get('value');
      }else if(metric.get('metric')==='minor_violations') {
        minor_violations=+metric.get('value');
      }else if(metric.get('metric')==='info_violations') {
        info_violations=+metric.get('value');
      }else if(metric.get('metric')==='bugs') {
        bugs=+metric.get('value');
      }else if(metric.get('metric')==='new_bugs') {
        console.log("NEW BUG.toJS()",metric.toJS());
        new_bugs=+metric.get('periods').get(0).get('value');                      //neeed comfirm
      }else if(metric.get('metric')==='reliability_rating') {
        console.log("reliability_rating.toJS()",metric.toJS());
        reliability_rating=+metric.get('value');
        reliability_rating = this.transferRating(reliability_rating);
        console.log("reliability_rating",reliability_rating);
      }else if(metric.get('metric')==='comment_lines') {
        comment_lines=+metric.get('value');
      }else if(metric.get('metric')==='comment_lines_density') {
        comment_lines_density=+metric.get('value');
      }else if(metric.get('metric')==='public_documented_api_density') {
        public_documented_api_density=+metric.get('value');
      }else if(metric.get('metric')==='public_undocumented_api') {
        public_undocumented_api=+metric.get('value');
      }else if(metric.get('metric')=='duplicated_blocks') {
        
        duplicated_blocks=+metric.get('value');
      }else if(metric.get('metric')==='duplicated_files') {
        duplicated_files=+metric.get('value');
      }else if(metric.get('metric')==='duplicated_lines') {
        duplicated_lines=+metric.get('value');
      }else if(metric.get('metric')==='duplicated_lines_density') {

        duplicated_lines_density=+metric.get('value');
      }
       
       /*else if(metric.get('metric')==='commented_out_code_lines') {
        commented_out_code_lines=+metric.get('periods').get(0).get('value'); 
      }*/
     
    });

    let quality_gate = errors.map(errorMetric => {
      return (<QualityGateTitle key={errorMetric.get('metric')+"codereview"} title={errorMetric.get('metric').replace(/_/g," ")} needFix={true} errorMetric={errorMetric}/>);
    });
    return (
			<Box  pad={{"vertical":"small"}}>
			    {statusHead}
          {quality_gate}
          <Box direction="row">
          <Header >
            Code Review
          </Header>
          <Box align="end">Powered by Sonar</Box>
          </Box>
          <Box  pad={{"vertical":"small","between":"small"}} direction="row" >
            
            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Overall</Heading>
              <Box >
                <Box direction="row" align="between" pad={{"between":"small","vertical":"small"}}>
                  <Box align="center" className="metric_parcel" >
                    <span>{ncloc}</span>
                    <span>Lines of code</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{files}</span>
                    <span>Files</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{classes}</span>
                    <span>Classes</span>
                  </Box>
                </Box>
                <Box direction="row"  align="between" pad={{"between":"small","vertical":"small"}}>
                  <Box align="center" className="metric_parcel" >
                    <span>{functions}</span>
                    <span>Functions</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{public_api}</span>
                    <span>Public API</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{statements}</span>
                    <span>Statements</span>
                  </Box>
                </Box>
              </Box>     
            </Box>

            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Duplications</Heading>
              <Box >
                <Box direction="row" align="between"  pad="small">
                  <Box align="center" className="metric_parcel" >
                    <span>{duplicated_blocks}</span>
                    <span>Duplicated blocks</span>
                  </Box>
                  <Box align="center" className="metric_parcel" >
                    <span>{duplicated_files}</span>
                    <span>Duplicated files</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{duplicated_lines}</span>
                    <span>Duplicated lines</span>
                  </Box>
                </Box>
                <Box   align="between" pad="small">
                  <span>Duplicated lines density</span>
                  <Meter value={duplicated_lines_density} units="%" />
                </Box>
 
              </Box>     
            </Box>


            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Bugs</Heading>
              <Box >

                <Box direction="row" align="between" pad={{"between":"small","vertical":"small"}}>
                  <Box align="center" className="metric_parcel" >
                    <span>{bugs}</span>
                    <span>Bugs</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{new_bugs}</span>
                    <span>New bugs</span>
                  </Box>

                </Box>
                <Box direction="row" align="between" pad={{"between":"small","vertical":"small"}}>
                  <Box align="center" className="metric_parcel" style={{"width":"200px"}}>
                    <span className={"rating "+reliability_rating.class}>{reliability_rating.rating}</span>
                    <span>Reliability rating</span>
                  </Box>
                </Box>

              </Box>     
            </Box>



          </Box>
          <Box  pad={{"vertical":"small","between":"small"}} direction="row" >

            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Documentation</Heading>
              <Box >
                <Box direction="row" align="between"  pad="small">
                  <Box align="center" style={{"width":"125px"}} className="metric_parcel" >
                    <span>{comment_lines}</span>
                    <span>Comment lines</span>
                  </Box>
                  <Box align="center" style={{"width":"125px"}} className="metric_parcel" >
                    <span>{public_undocumented_api}</span>
                    <span>Public undocumented api</span>
                  </Box>
                </Box>
                <Box   align="between" pad="small">
                  <span>Public documented api density</span>
                  <Meter value={public_documented_api_density} units="%" />
                </Box>
                <Box align="between" pad="small">
                  <span>Comment lines density</span>
                  <Meter value={comment_lines_density} units="%" />
                </Box>
 
              </Box>     
            </Box>
            
            <Box className="metric_block"  pad="small" align="center">
              <Heading strong={true} tag="h6">Issues</Heading>
              <Box >
              <Meter legend={{"placement": "inline"}} series={[
  {"label": "Blocker", "value": blocker_violations ,"colorIndex":"critical"},
  {"label": "Critical", "value": critical_violations,"colorIndex":"critical"},
  {"label": "Major", "value": major_violations,"colorIndex":"warning"},
  {"label": "Minor", "value": minor_violations,"colorIndex":"ok"},
  {"label": "Info", "value": info_violations,"colorIndex":"ok"}
              ]} a11yTitleId="meter-title-12" a11yDescId="meter-desc-12" />
               
              </Box>     
            </Box>

          </Box>


			</Box>
			);
  }
}
