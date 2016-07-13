import React, { Component } from 'react';
//import App from 'grommet/components/App';
//import Split from 'grommet/components/Split';
//import Sidebar from 'grommet/components/Sidebar';
//import Menu from 'grommet/components/Menu';
//import Anchor from 'grommet/components/Anchor';
//import Header from 'grommet/components/Header';
//import Article from 'grommet/components/Article';
import BarSeparater from './BarSeparater';
import Box from 'grommet/components/Box';
import StatusBar from './StatusBar';
//import Next from 'grommet/components/icons/base/Next';
import { Link } from 'react-router';
export default class CI extends Component {


  render () {
    //let {project, application} = this.props;
    console.log("CI props",this.props);
    let {buildResult,project,application} = this.props;
    return (
    	<Box>
            <Box focusable={false}   direction="row" align="start">
              <Box direction="row" className="statusBarList"> 
                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/overview",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('integrationStatus')} inProgress={buildResult.get('isprogress')}  title="Overview"/>
                </Link>

                <BarSeparater />

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/code",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('barStatus').get('code').get('status')} inProgress={buildResult.get('barStatus').get('code').get('isprogress')} title="Code"/>
                </Link>

                <BarSeparater/>

                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/unittest",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('barStatus').get('unit_test').get('status')} inProgress={buildResult.get('barStatus').get('unit_test').get('isprogress')}  title="Unit Test"/>
                </Link>

                <BarSeparater/>
                
                <StatusBar status={buildResult.get('barStatus').get('functional_test').get('status')} inProgress={buildResult.get('barStatus').get('functional_test').get('isprogress')}  title="Functional Test"/>

                <BarSeparater/>
                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/codereview",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('barStatus').get('code_review').get('status')} inProgress={buildResult.get('barStatus').get('code_review').get('isprogress')}  title="Code Review"/>
                </Link>
                <BarSeparater/>
                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/security",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('barStatus').get('security').get('status')} inProgress={buildResult.get('barStatus').get('security').get('isprogress')}  title="Security"/>
                </Link>
                <BarSeparater/>
                <StatusBar status={buildResult.get('barStatus').get('performance').get('status')} inProgress={buildResult.get('barStatus').get('performance').get('isprogress')}  title="Performance"/>
                <BarSeparater/>
                <Link activeClassName="active"  to={{pathname:"/projects/application/CI/build",query:{projectId:project._id,appId:application._id}}}>
                  <StatusBar status={buildResult.get('barStatus').get('build').get('status')} inProgress={buildResult.get('barStatus').get('build').get('isprogress')}  title="Build"/>
                </Link>
              </Box>
            </Box>
            {this.props.children}
        </Box>
			);
  }
}
