import React, { Component } from 'react';
//import App from 'grommet/components/App';
//import Split from 'grommet/components/Split';
//import Sidebar from 'grommet/components/Sidebar';
//import Menu from 'grommet/components/Menu';
//import Anchor from 'grommet/components/Anchor';
//import Header from 'grommet/components/Header';
//
//import BarSeparater from './BarSeparater';
import Box from 'grommet/components/Box';
import StatusBar from './StatusBar';
//import Next from 'grommet/components/icons/base/Next';
import { Link } from 'react-router';
import Button from 'grommet/components/Button';
import { hashHistory } from 'react-router';

export default class CI extends Component {

  nextLocation() {
    console.log("location",this.props);
 
    var curRoute = this.props.routes[this.props.routes.length-1];
    var brotherRoute = this.props.routes[this.props.routes.length-2].childRoutes;
    var nextIndex = 0;
    for (var i = 0; i < brotherRoute.length; i++) {
     // console.log("brotherRoute[i].path===curRoute",brotherRoute[i].path,curRoute);
      if(brotherRoute[i].path===curRoute.path) {
        if(i===brotherRoute.length-1) {
          nextIndex=0;
        }else {
          nextIndex=i+1;
        }
        break;
      }
    }
    var nextPath=brotherRoute[nextIndex].path;
    var fatherRoute="";
    for (var i = 0; i < this.props.routes.length-1; i++) {
      if(i===0) {
        fatherRoute+= this.props.routes[i].path;
      }else{
        fatherRoute+= this.props.routes[i].path+"/";
      }
      
    }
    var nextRoute = fatherRoute+nextPath;
    console.log("nextRoute",nextRoute);
    hashHistory.push({pathname:nextRoute,query:this.props.location.query});
  }
  render () {
    //let {project, application} = this.props;
    console.log("CI props",this.props);
    let {project,application,integrationRecord} = this.props;
    let inProgress=false;
    if(integrationRecord.get('status')==="SPINNING") {
      inProgress=true;
    }
//inProgress=true;
    let codeStatus="unknown";
    let unitTestStatus="unknown";
    let codeReviewStatus="unknown";
    let securityStatus="unknown";
    let buildStatus="unknown";

    let result = integrationRecord.get('result');
    if(result) {
      if(result.get('build').size>0) {
        if(!result.get('build').get('branch')) {
          codeStatus="critical";
        }else{
          codeStatus="ok";
        }
      }

      if(result.get('code_review').get('status')!=='SUCCESS') {
        codeReviewStatus="critical";
      }else{
        codeReviewStatus="ok";
      }

      if(result.get('security_test').get('status')!=='SUCCESS') {
        securityStatus="critical";
      }else{
        securityStatus="ok";
      }

      if(result.get('unit_test').get('status')!=='SUCCESS') {
        unitTestStatus="critical";
      }else{
        unitTestStatus="ok";
      }

      if(result.get('build').get('status')==='SUCCESS') {
        buildStatus="ok";
      }else if(result.get('build').get('status')==='FAILURE') {
        buildStatus="critical";
      }else{
        buildStatus="warning";
      }
    }
    
    return (
    	<Box pad="medium">
            <Box focusable={false} justify="between"  direction="row" align="start">
              <Box direction="row" className="statusBarList"> 

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/code",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <StatusBar status={codeStatus} inProgress={inProgress} title="Code"/>
                </Link>

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/unittest",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <StatusBar status={unitTestStatus} inProgress={inProgress}  title="Unit Test"/>
                </Link>

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/codereview",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <StatusBar status={codeReviewStatus} inProgress={inProgress}  title="Code Review" />
                </Link>

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/security",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <StatusBar status={securityStatus} inProgress={inProgress}  title="Security"/>
                </Link>

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/build",query:{projectId:project._id,appId:application._id,curRecordId:integrationRecord.get('_id')}}}>
                  <StatusBar status={buildStatus} inProgress={inProgress}  title="Build"/>
                </Link>
              </Box>
              <Box>
                <Button label="Next" onClick={this.nextLocation.bind(this)}/>
              </Box>
            </Box>
            
            {this.props.children}
        </Box>
			);
  }
}
