import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
/*
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
import Spinning from 'grommet/components/icons/Spinning';
import Immutable  from 'immutable';
export default class CICode extends Component {

  componentDidUpdate () {
    
    let {buildResult,gitGitHubRepository,codeRepository,gitGitHubRepositoryLanguages} = this.props;
    console.log("codeRepository",codeRepository);
    if(buildResult.get('build').size>0&&codeRepository.get('git').get('repository').size==0) {
      
      gitGitHubRepository(this.getGitRepository());
    }
    if(buildResult.get('build').size>0&&codeRepository.get('git').get('language').size==0) {
      gitGitHubRepositoryLanguages(this.getGitRepository());
    }
    
  }
  getGitRepository() {
    let {buildResult} = this.props;
    if(buildResult.size>0) {
      let branchInfo = Immutable.fromJS(buildResult.get('build').get('actions')).find(action=>{
        if(action.get('buildsByBranchName')) {
          return true;
        }else{
          return false;
        }
      });
      return branchInfo.get('remoteUrls').get(0);
    }else{
      return false;
    }
  }
  render () {
    
    let {buildResult,codeRepository} = this.props;
    if(buildResult.get('build').size==0) {
      return (
        <Box>
          <Spinning/>
        </Box>
      );
    }
    console.log("CICode",this.props.buildResult.get('build').toJS());
    let branchInfo = Immutable.fromJS(buildResult.get('build').get('actions')).find(action=>{
      if(action.get('buildsByBranchName')) {
        return true;
      }else{
        return false;
      }
    });
    let statusHead=(<Notification status="ok"  message="Check out code successfully"  />);
    if(!branchInfo) {
      statusHead=(<Notification status="critical"  message="Check out code failed"  />);
    }
    let code=(<Spinning/>);
    console.log("buildVersionInfo",branchInfo.toJS());
    let codeLanguages;
    console.log("codeRepository",codeRepository);
    if(codeRepository.get('git').get('language').size>0) {
      codeLanguages = codeRepository.get('git').get('language').map((size,language)=>{
        return (<span key={language}>{language}:{size}</span>);
      });
    }else{
      codeLanguages = (<Spinning/>);
    }
    if(codeRepository.get('git').get('repository').size>0&&branchInfo) {
      code=(
      <Box>
        <Heading strong={true} tag="h6">
         Repository Infomation
        </Heading>
        <span>Url:<Anchor target="_blank" href={codeRepository.get('git').get('repository').get('html_url')} label={codeRepository.get('git').get('repository').get('html_url')}/> </span>
        <span>SHA1:{branchInfo.get('lastBuiltRevision').get('SHA1')}</span>
        <span>Build branch:{branchInfo.get('lastBuiltRevision').get('branch').get(0).get('name')}</span>
        <span>Default branch:{codeRepository.get('git').get('repository').get('default_branch')}</span>
        <span>Create at:{codeRepository.get('git').get('repository').get('created_at')}</span>
        <span>Updated at:{codeRepository.get('git').get('repository').get('updated_at')}</span>
        <span>Pushed at:{codeRepository.get('git').get('repository').get('pushed_at')}</span>
        {codeLanguages}
      </Box>);
    }
    return (
			<Box pad={{"vertical":"small"}}>
        {statusHead}
			  <List>
			    <ListItem>
			      {code}
			    </ListItem>
			  </List>
			</Box>
			);
  }
}
