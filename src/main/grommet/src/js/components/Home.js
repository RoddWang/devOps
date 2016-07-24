import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Chart from 'grommet/components/Chart';
import Spinning from  'grommet/components/icons/Spinning';
import Immutable  from 'immutable';

import Heading from 'grommet/components/Heading';

import Tab from 'grommet/components/Tab';
import Tabs from 'grommet/components/Tabs';
import Meter from 'grommet/components/Meter';
/*import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';*/

/*
<Chart type="bar" max={20} threshold={3} xAxis={[
       {"label": "May 22", "value": 8},
     {"label": "May 21", "value": 7},
      {"label": "May 20", "value": 6},
      {"label": "May 19", "value": 5},
       {"label": "May 18", "value": 4},
       {"label": "May 17", "value": 3},
       {"label": "May 16", "value": 2},
       {"label": "May 15", "value": 1}
    ]} units="TB" series={[
      { 
        "label":"test label",
        "unit":"ms",
        "values": [
          [8,0],
          [7,1],
          [6,2],
          [5,3],
          [4,4],
          [3,5],
          [2,6],
          [1,7]
        ],
        "colorIndex": "graph-1"
      }
    ]} legend={{"position": "overlay"}}  />*/
export default class Home extends Component {
  componentDidMount () {
    let {projectListAction,refreshAllIntegrationRecord} = this.props;
    console.log("componentDidMount in HOME");
    projectListAction();
    refreshAllIntegrationRecord();
  }
  componentDidUpdate() {
    let {refreshAllIntegrationRecord,allIntegrationRecords} = this.props;
    if(allIntegrationRecords.size===0) {
      refreshAllIntegrationRecord();
    }
  }

  generateBuildHistoryChart(groupedRecord) {
    let xAxis = {"placement": "bottom"};
    xAxis.data=new Array();
    let successSeriesValue = new Array();
    let warningSeriesValue = new Array();
    let errorSeriesValue = new Array();
    let max = 0;
    console.log("groupedRecord",groupedRecord);
    groupedRecord.map((entry, index, array)=>{
      let curSize = entry.get('successRecords').size+entry.get('warningRecord').size+entry.get('errorRecord').size;
      if(max<curSize) {
        max = curSize+1;
      }
      xAxis.data.push({"label":entry.get("project").name,"value":index});
    

      successSeriesValue.push([index,+entry.get('successRecords').size]);
      warningSeriesValue.push([index,+entry.get('warningRecord').size]);
      errorSeriesValue.push([index,+entry.get('errorRecord').size]);
    });
    console.log("errorSeriesValue",errorSeriesValue);

    //seriesValue=[{"x":0,"y":1},{"x":1,"y":3},{"x":2,"y":2}];
    return (
    	<Box pad="medium">
    	<Heading strong={true} tag="h6">
         Continuous Integration Statistics
        </Heading>
    <Chart type="bar" max={max*3}  xAxis={xAxis} units="times" series={[
      { 
        "label":"Success",
        "values": successSeriesValue,
        "colorIndex": "ok"
      },
      { 
        "label":"Warning",
        "values": warningSeriesValue,
        "colorIndex": "warning"
      },
      { 
        "label":"Failure",
        "values": errorSeriesValue,
        "colorIndex": "critical"
      }
    ]} legend={{"total": true,"position":"overlay"}}  />
    </Box>
    );
  }
  grpRecordByProject() {
    let {projectList,allIntegrationRecords} = this.props;
    console.log('projectList',projectList);
    let result = Immutable.List.of();
    projectList.forEach((project,index,list)=>{
      
      let success4project=Immutable.List.of();
      let warning4project=Immutable.List.of();
      let error4project=Immutable.List.of();
      allIntegrationRecords.filter((record,recId,arr)=>{
        if(project._id===record.get('projectId')) {
          return true;
        }
      }).forEach((record,recId,arr)=>{
        if(record.get('status')==='SUCCESS') {
          success4project = success4project.push(record);
        }else if(record.get('status')==="ERROR") {
          error4project = error4project.push(record);
        }else {
          warning4project = warning4project.push(record);
        }
      });
      result = result.push(Immutable.Map({project:project,successRecords:success4project,warningRecord:warning4project,errorRecord:error4project}));
    });
    return result;
  }
  render () {
    console.log("Home",this.props);
    let {projectList} = this.props;
    if(projectList.size===0) {
      return (<Box full={true} justify="center"><Spinning/></Box>);
    }
  /*  let buildHistoryChart = (<Spinning/>);
    if(allIntegrationRecords.size>0) {
      let groupedRecord = this.grpRecordByProject();
      buildHistoryChart= this.generateBuildHistoryChart(groupedRecord);
    }*/
    var appsize = 0;
    projectList.forEach((proj,index,array)=>{
      appsize+=proj.apps.length;
    });
    return (
          <Box full={true} pad={{"between":"medium"}} >
          <Box className="panel-header" focusable={false} justify="between" direction="row" pad="medium" align="center">
              <Box  focusable={false} align="center" direction="row" justify="end">
                <Heading tag="h2" strong={true}  align="center">
                Dashboard
                </Heading>
              </Box>
          </Box>
            <Box align="center" direction="row" justify="start" pad={{"horizontal":"medium","between":"large"}}>
              <Box  justify="end" pad="medium"  className="dashboard--box">
                <Box className="dashboard--box--title">Overall</Box>
                <Box justify="center" direction="row" pad={{"between":"medium"}} >
                  <Box  justify="center" align="center" pad={{"between":"medium"}}>
                    <Box align="center" direction="row" pad={{"between":"small"}}>
                      <span className="dashboard--highlight">{projectList.size}</span> 
                      <span className="dashboard--highlight--subTitle">Assets</span>
                    </Box>
                    <Box align="center">
                      <span className="maturity--title">Assets Maturity</span>
                      <Meter type="spiral" legend={{"placement":"inline","total":false}} series={[
                        {"label": "High", "value": 70, "colorIndex": "ok"},
                        {"label": "Medium", "value": 15, "colorIndex": "warning"},
                        {"label": "Low", "value": 5, "colorIndex": "error"}
                      ]} max={90}  />
                    </Box>
                  </Box>
                  <Box justify="center" align="center" pad={{"between":"medium"}}>
                    <Box align="center" direction="row" pad={{"between":"small"}}>
                      <span className="dashboard--highlight">{appsize}</span> 
                      <span className="dashboard--highlight--subTitle">Instances</span>
                    </Box>
                    <Box align="center">
                      <span className="maturity--title">Instances Maturity</span>
                      <Meter type="spiral" legend={{"placement":"inline","total":false}} series={[
                        {"label": "High", "value": 70, "colorIndex": "ok"},
                        {"label": "Medium", "value": 15, "colorIndex": "warning"},
                        {"label": "Low", "value": 5, "colorIndex": "error"}
                      ]} max={90}  />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box  justify="end" pad="medium"  className="dashboard--box">
                <Box className="dashboard--box--title">Check in Frequency</Box>
                <Box justify="center" >
                  <Chart  max={100} series={[
                    { 
                      "label":"Assets",
                    
                      "values": [
                        [5,100],
                        [4,91],
                        [3,85],
                        [2,66],
                        [1,36]
                      ],
                      "colorIndex": "ok"
                    }
                  ]} legend={{"position": "inline"}}  />
                  <Box style={{"marginBottom":"100px"}}>
                  <Chart  type="bar" max={8} xAxis={ {"placement":"bottom",data:[
                    {"label": "25-30", "value": 5},
                    {"label": "20-25", "value": 4},
                    {"label": "0-5", "value": 3},
                    {"label": "15-20", "value": 2},
                    {"label": "10-15", "value": 1}
                  ]}} legend={{"total":true}} series={[
                    { 
                      "label":"Assets",
                   
                      "values": [
                        [5,1],
                        [4,1],
                        [3,2],
                        [2,4],
                        [1,5]
                      ],
                      "colorIndex": "ok"
                    }
                  ]} legend={{"position": "overlay"}}  />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box  direction="row" full="horizontal" align="center" justify="start" pad={{"horizontal":"medium","between":"large"}}>
              <Box pad="medium" justify="end" className="dashboard--box">
                <Box className="dashboard--box--title" >Code Quality</Box>
                <Tabs initialIndex={0} justify="start">

                  <Tab title="Code Review">
                    <Chart type="bar" max={20} xAxis={{"placement":"bottom",data:[
                      {"label": "July 27", "value": 8},
                      {"label": "July 26", "value": 7},
                      {"label": "July 25", "value": 6},
                      {"label": "July 24", "value": 5},
                      {"label": "July 23", "value": 4},
                      {"label": "July 22", "value": 3},
                      {"label": "July 21", "value": 2},
                      {"label": "July 20", "value": 1}
                    ]}} units="time(s)" legend={{"total":true}} series={[
                      { 
                        "label":"Success",
                     
                        "values": [
                          [8,7],
                          [7,5],
                          [6,5],
                          [5,3],
                          [4,4],
                          [3,3],
                          [2,6],
                          [1,5]
                        ],
                        "colorIndex": "ok"
                      },
                      { 
                        "label":"Failure",
                   
                        "values": [
                          [8,6],
                          [7,1],
                          [6,3],
                          [5,2],
                          [4,4],
                          [3,6],
                          [2,6],
                          [1,3]
                        ],
                        "colorIndex": "critical"
                      }
                    ]} legend={{"position": "overlay"}}  />
                  </Tab>
                  <Tab title="Security Scan">
                    <Chart type="bar" max={20} xAxis={{"placement":"bottom",data:[
                      {"label": "July 27", "value": 8},
                      {"label": "July 26", "value": 7},
                      {"label": "July 25", "value": 6},
                      {"label": "July 24", "value": 5},
                      {"label": "July 23", "value": 4},
                      {"label": "July 22", "value": 3},
                      {"label": "July 21", "value": 2},
                      {"label": "July 20", "value": 1}
                    ]}}  legend={{"total":true}} series={[
                      { 
                        "label":"Success",
                     
                        "values": [
                          [8,5],
                          [7,5],
                          [6,5],
                          [5,4],
                          [4,5],
                          [3,5],
                          [2,4],
                          [1,5]
                        ],
                        "colorIndex": "ok"
                      },
                      { 
                        "label":"Failure",
                   
                        "values": [
                          [8,0],
                          [7,0],
                          [6,0],
                          [5,1],
                          [4,0],
                          [3,0],
                          [2,1],
                          [1,0]
                        ],
                        "colorIndex": "critical"
                      }
                    ]} legend={{"position": "overlay"}}  />
                  </Tab>
                </Tabs>
              </Box>
              <Box pad="medium" justify="end" className="dashboard--box">
                <Box className="dashboard--box--title" >Deployment</Box>
                <Tabs initialIndex={0} justify="start">
                  <Tab title="Build">
                    <Chart type="bar" max={20} xAxis={{"placement":"bottom",data:[
                      {"label": "July 27", "value": 8},
                      {"label": "July 26", "value": 7},
                      {"label": "July 25", "value": 6},
                      {"label": "July 24", "value": 5},
                      {"label": "July 23", "value": 4},
                      {"label": "July 22", "value": 3},
                      {"label": "July 21", "value": 2},
                      {"label": "July 20", "value": 1}
                    ]}}  legend={{"total":true}} series={[
                      { 
                        "label":"Success",
                     
                        "values": [
                          [8,5],
                          [7,4],
                          [6,2],
                          [5,3],
                          [4,4],
                          [3,1],
                          [2,2],
                          [1,3]
                        ],
                        "colorIndex": "ok"
                      },
                      { 
                        "label":"Failure",
                   
                        "values": [
                          [8,1],
                          [7,2],
                          [6,3],
                          [5,3],
                          [4,4],
                          [3,1],
                          [2,2],
                          [1,1]
                        ],
                        "colorIndex": "critical"
                      },
                      { 
                        "label":"Unstable",
                   
                        "values": [
                          [8,3],
                          [7,2],
                          [6,1],
                          [5,3],
                          [4,2],
                          [3,4],
                          [2,3],
                          [1,2]
                        ],
                        "colorIndex": "warning"
                      }
                    ]} legend={{"position": "overlay"}}  />
                  </Tab>
                  <Tab title="Deploy">
                    <Chart type="bar" max={20} xAxis={{"placement":"bottom",data:[
                      {"label": "July 27", "value": 8},
                      {"label": "July 26", "value": 7},
                      {"label": "July 25", "value": 6},
                      {"label": "July 24", "value": 5},
                      {"label": "July 23", "value": 4},
                      {"label": "July 22", "value": 3},
                      {"label": "July 21", "value": 2},
                      {"label": "July 20", "value": 1}
                    ]}}  legend={{"total":true}} series={[
                      { 
                        "label":"Active",
                     
                        "values": [
                          [8,5],
                          [7,4],
                          [6,2],
                          [5,3],
                          [4,4],
                          [3,1],
                          [2,2],
                          [1,3]
                        ],
                        "colorIndex": "ok"
                      },
                      { 
                        "label":"Inactive",
                   
                        "values": [
                          [8,1],
                          [7,2],
                          [6,3],
                          [5,3],
                          [4,4],
                          [3,1],
                          [2,2],
                          [1,1]
                        ],
                        "colorIndex": "critical"
                      }
                    ]} legend={{"position": "overlay"}}  />
                  </Tab>
                </Tabs>
              </Box>
            </Box>

          </Box>
			);
  }
}
