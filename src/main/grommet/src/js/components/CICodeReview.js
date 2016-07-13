import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import QualityGateTitle from './QualityGateTitle';
/*
import Tile from 'grommet/components/Tile';*/
/*import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
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
    let {buildResult} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    let statusHead=(<Notification status="ok"  message="Quality Gate success"  />);
    //console.log('test unit error',buildResult.get('unit_test').find(metric => metric.get('metric')==='test_errors').get('value'));
    let errors = buildResult.get('code_review').filter( metric => metric.get('status')!='OK');
    console.log("error",errors);
    if(errors.size>0) {
      statusHead=(<Notification status="critical"  message="Failed cause Quality Gate" />);
    }

    let files=0;
    let ncloc=0;
    let classes=0;
    let functions=0;
    let statements=0;
    let public_api=0;
   // let lines=0;
    let blocker_violations=0;
    let critical_violations=0;
    let major_violations=0;
    let minor_violations=0;
    let info_violations=0;

    let bugs=0;
    let new_bugs=0;
    let reliability_rating=0;

    let comment_lines=0;
    let comment_lines_density=0;
    let public_documented_api_density=0;
    let public_undocumented_api=0;
    //let commented_out_code_lines=0;
    

    let duplicated_blocks=0;
    let duplicated_files=0;
    let duplicated_lines=0;
    let duplicated_lines_density=0;
    
    console.log("code review errors",buildResult.get('code_review').toJS());
    buildResult.get('code_review').forEach((metric, index, array)=>{
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
    console.log("buildResult.get('code_review')",buildResult.get('code_review').toJS());

    let quality_gate = errors.map(errorMetric => {
      return (<QualityGateTitle title="Security Rating" errorMetric={errorMetric}/>);
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
                    <span>{ncloc}</span>
                    <span>Lines of code</span>
                  </Box>
                  <Box align="center" className="metric_parcel">
                    <span>{files}</span>
                    <span>Fiels</span>
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
              <Heading strong={true} tag="h6">Duplicatations</Heading>
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
                    <span>Duplicated liness</span>
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
