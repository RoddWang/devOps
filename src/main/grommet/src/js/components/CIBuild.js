import React, { Component } from 'react';
import Box from 'grommet/components/Box';
//import Spinning from 'grommet/components/icons/Spinning';
import TableRow from 'grommet/components/TableRow';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import {TIMERS} from '../constants/Constants';
import { hashHistory } from 'react-router';
/*import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/
export default class CIBuild extends Component {

  
  componentDidUpdate() {
    let {integrationRecord,queryIntegrationResult} = this.props;
    if(integrationRecord.get('status')==='SPINNING'&&!TIMERS[integrationRecord.get('_id')]) {
      console.log("start timer for :"+integrationRecord.get('_id'));
      let timer=setInterval(function () {
        queryIntegrationResult(integrationRecord.get('_id'));
      },10000);
      TIMERS[integrationRecord.get('_id')]=timer;
    }
  }
  reBuild(project,application) {
    let {build}=this.props;
    build(project._id,application._id);
  }
  bildHistoryClick(recordId) {
    let {project,application} = this.props;
    hashHistory.push({pathname:`/projects/application/CI/build`,query:{projectId:project._id,appId:application._id,curRecordId:recordId}});
  }
  render () {
    let {integrationRecord,allIntegrationRecords} = this.props;


    console.log('build ssssss',allIntegrationRecords.toJS());
    let {project,application} = this.props;
    

    let history =  allIntegrationRecords.map(record=>{
      var endTime = record.get('endUTC');
      var buildNo = record.get('buildNo');
      var image = record.get('imageName');
      var sha = 'N/A';
      var status = record.get('status');
      if(record.get('result')) {
        sha = record.get('result').get('build').get('sha').substring(0,7);
        status = record.get('result').get('build').get('status');
      }
      let curRecordClass="";
      if(integrationRecord&&integrationRecord.get('_id')===record.get('_id')) {
        curRecordClass="cur_record";
      }
      return (
        <TableRow onClick={this.bildHistoryClick.bind(this,record.get('_id'))} className={curRecordClass}  key={record.get('_id')+"buildHistory"} >
          <td>{buildNo}</td>
          <td>{status}</td>
          <td>{sha}</td>
          <td>{image||'N/A'}</td>
          <td>{endTime}</td>
        </TableRow>
      );
    });
  /*  let build 
    if(this.state.buildFlag) {

    }*/
    return (
			<Box pad={{vertical:"medium"}}>
        <Table selectable={true} scrollable={true}>
          <thead>
           <tr>
          <th>Build No.</th>
          <th>Status</th>
          <th>SHA</th>
          <th>Image</th>
          <th>Complete Time (UTC)</th>
           </tr>
          </thead>
          <tbody>
			      {history}
          </tbody>
        </Table>
        <Box align="center" pad={{vertical:"medium"}}>
          <Button label="ReBuild" primary={true} onClick={this.reBuild.bind(this,project,application)} />
        </Box>
			</Box>
			);
  }
}
