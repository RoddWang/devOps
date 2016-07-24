import React, { Component } from 'react';
//import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
//import {ERROR,INITIAL} from '../constants/Constants'

//import {SUCCESS} from '../constants/Constants';

import { hashHistory } from 'react-router';

export default class NewApplication extends Component {

  close () {
    hashHistory.goBack();
  }
  submitGit () {
    let {createGitApplicationAction,project} = this.props;
    console.log("this.refs.application_repository_git",this.refs.application_repository_git);
    createGitApplicationAction(project._id,this.refs.application_name_git.value,this.refs.application_repository_git.value);
  }
  submitSVN () {
    let {createSVNApplicationAction,project} = this.props;
    createSVNApplicationAction(project._id,this.refs.application_name_svn.value,this.refs.application_repository_svn.value);
  }

  componentDidUpdate () {
    
    let {project,layer} = this.props;
    console.log("new application componentDidUpdate",layer.toJS());
    if(layer.get('status')=='success') {
      hashHistory.push({pathname:`/projects/application`,query:{projectId:project._id,appId:layer.get('newApp')._id,curRecordId:layer.get('newRecord')._id}});
    }
    
  }
  render () {

    console.log("NewApplication props",this.props);
    let {project,layer} = this.props;
    console.log("layer.get('msg')",layer.get('msg'));
    return (
    	    <Layer onClose={this.close.bind(this)} closer={true} hidden={false}  align="right">
            <Tabs initialIndex={0}>
              <Tab title="Git Hub">
                <Form >
                   <Header>Create Git Hub Application for Asset {project.name}</Header>
                   <fieldset>
                       <FormField htmlFor="application_name_git" label="Application Name"  >
                          <input ref="application_name_git" id="application_name_git" type="text"/>
                       </FormField>
                       <FormField htmlFor="application_repository_git" label="Repository url"  >
                          <input ref="application_repository_git" id="application_repository_git" type="text"/>
                       </FormField>
                    </fieldset>
                    <Footer>
                      <Button label="Create" primary={true} onClick={this.submitGit.bind(this)}></Button>
                    </Footer>
                </Form>
              </Tab>
              <Tab title="SVN">
                <Form >
                   <Header>Create Subversion Application for project {project.name}</Header>
                   <fieldset>
                       <FormField htmlFor="application_name_svn" label="Application Name"  >
                          <input ref="service_name_svn" id="application_name_svn" type="text"/>
                       </FormField>
                       <FormField htmlFor="application_repository_svn" label="Repository url"  >
                          <input ref="application_repository_svn" id="application_repository_svn" type="text"/>
                       </FormField>
                    </fieldset>
                    <Footer>
                      <Button label="Create" primary={true} onClick={this.submitSVN.bind(this)}></Button>
                    </Footer>
                </Form>
              </Tab>
            </Tabs>
            <Footer>
                <span>{layer.get('msg')}</span>
            </Footer>
          </Layer>
			
			);
  }
}
