import React, { Component } from 'react';
import Box from 'grommet/components/Box';
//import Notification from 'grommet/components/Notification';
//import List from 'grommet/components/List';
//import ListItem from 'grommet/components/ListItem';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
/*
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
import Spinning from 'grommet/components/icons/Spinning';
import StatusRibbon from './StatusRibbon';
//import Immutable  from 'immutable';
export default class CICode extends Component {

  componentDidMount () {
    
    let {gitGitHubRepository,codeRepository,gitGitHubRepositoryLanguages,integrationRecord} = this.props;
    console.log("codeRepository",codeRepository);
    if(integrationRecord.get('result')&&codeRepository.get('git').get('repository').size==0) {
      gitGitHubRepository(integrationRecord.get('repositoryUrl'));
    }
    if(integrationRecord.get('result')&&codeRepository.get('git').get('language').size==0) {
      gitGitHubRepositoryLanguages(integrationRecord.get('repositoryUrl'));
    }
    
  }

  render () {
    
    let {codeRepository,integrationRecord} = this.props;
    console.log('integrationRecord~~~~~~~~~~~~',integrationRecord.toJS());
    if(integrationRecord.get('status')==='SPINNING') {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }

    if(integrationRecord.get('buildNo')===-1||!integrationRecord.get('result')) {
      return <span></span>;
    }

    let branchInfo = integrationRecord.get('result').get('build').get('buildDetail').get('actions').find(action=>{
      if(action.get('buildsByBranchName')) {
        return true;
      }else{
        return false;
      }
    }); 
    let statusHead=(<StatusRibbon status="ok"  title="Code checked out into DevOps Center successfully"  />);
    if(!branchInfo) {
      statusHead=(<StatusRibbon status="critical"  title="Code checked out into DevOps center failed"  />);
    }
    let code=(<Spinning/>);
    console.log("buildVersionInfo",branchInfo.toJS());
/*    let codeLanguages;
    console.log("codeRepository",codeRepository);
    if(codeRepository.get('git').get('language').size>0) {
      codeLanguages = codeRepository.get('git').get('language').map((size,language)=>{
        return (<span key={language}>{language}:{size}</span>);
      });
    }else{
      codeLanguages = (<Spinning/>);
    }*/
    if(codeRepository.get('git').get('repository').size>0&&branchInfo) {
      code=(
      <Box pad={{"vertical":"medium"}}>
        <Heading strong={true} tag="h6">
         Repository Infomation
        </Heading>
        <Box full="horizontal" separator="bottom" pad={{"vertical":"small"}}>
          <Box direction="row" justify="between">
            <Box style={{"width":"20%"}}>Code Repository</Box>
            <Box  style={{"width":"80%"}}>GitHub</Box>
          </Box>
          <Box direction="row" justify="between" pad={{"vertical":"small"}}>
            <Box style={{"width":"20%"}}>URL</Box>
            <Box  style={{"width":"80%"}}><Anchor target="_blank" href={codeRepository.get('git').get('repository').get('html_url')} label={codeRepository.get('git').get('repository').get('html_url')}/> </Box>
          </Box>
          <Box direction="row" justify="between" pad={{"vertical":"small"}}>
            <Box style={{"width":"20%"}}>Build branch</Box>
            <Box style={{"width":"80%"}}>{branchInfo.get('lastBuiltRevision').get('branch').get(0).get('name')}</Box>
          </Box>
        </Box>
        <Box full="horizontal" separator="bottom" pad={{"vertical":"small"}}>
          <Box direction="row" justify="between">
            <Box style={{"width":"20%"}}>Code version</Box>
            <Box style={{"width":"80%"}}>{branchInfo.get('lastBuiltRevision').get('SHA1')}</Box>
          </Box>
          <Box direction="row" justify="between" pad={{"vertical":"small"}}>
            <Box style={{"width":"20%"}}>Push Date</Box>
            <Box style={{"width":"80%"}}>{codeRepository.get('git').get('repository').get('pushed_at')}</Box>
          </Box>
        </Box>

      </Box>);
    }
    return (
			<Box pad={{"vertical":"small"}}>
        {statusHead}
			  {code}
			</Box>
			);
  }
}
