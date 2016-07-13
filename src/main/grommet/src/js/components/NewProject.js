import React, { Component } from 'react';
//import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

import {SUCCESS} from '../constants/Constants';

import { hashHistory } from 'react-router';

export default class NewProject extends Component {
  submit () {
    let {createNewProjectAction}=this.props;
    console.log("before createNewProjectAction");
    createNewProjectAction(this.refs.project_create.value);
    console.log("after createNewProjectAction");
  }
  close () {
    let { closeAction } = this.props;
    closeAction();
    hashHistory.push('/projects/list');
  }
  render () {

    let {newProject} = this.props;
   // console.log("newProject",newProject);
    return (
    	    <Layer onClose={this.close.bind(this)} closer={true} hidden={false} align="right">
               <Form >
                   <Header>Create New Project</Header>
                   <fieldset>
                       <FormField htmlFor="project_create" label="Project Name" error={newProject.get('error')}>
                          <input ref="project_create" id="project_create" type="text"  name="projectName"/>
                       </FormField>
                    </fieldset>
                    <Footer>
                        {newProject.get('status')==SUCCESS?"success":(<Button primary={true} label="Create" onClick={this.submit.bind(this)} />)}
                    </Footer>
               </Form>
            </Layer>
			
			);
  }
}
