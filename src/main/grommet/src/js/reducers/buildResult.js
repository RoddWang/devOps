import { INTEGRATION_RESULT,INTEGRATION_RESULT_CLEAR } from '../actions/integration';
import Immutable  from 'immutable';
import {CODE_METRICS,TEST_METRICS,SECURITY_METRICS, RELIABILITY_METRICS,
    MAINTAINABILITY_METRICS,ISSUES_METRICS,DOCUMENTATION_METRICS,COMPLEXITY_METRICS,QUALITY_GATE,DUPLICATIONS_METRICS} from '../constants/Constants';
import {INTEGRATION_BUILD_SUCCESS} from '../actions/integration';
const initIntegrationResult= Immutable.Map({isprogress:true,
    integrationStatus:'initial',
    unit_test:Immutable.Map(),
    security_test:Immutable.Map(),
    code_review:Immutable.Map(),
    functional_test:Immutable.Map(),
    build:Immutable.Map(),
    perfomance_test:Immutable.Map(),
    barStatus:Immutable.Map({
      overview:Immutable.Map({'isprogress':true,status:'initial'}),
      code:Immutable.Map({'isprogress':true,status:'initial'}),
      unit_test:Immutable.Map({'isprogress':true,status:'initial'}),
      code_review:Immutable.Map({'isprogress':true,status:'initial'}),
      security:Immutable.Map({'isprogress':true,status:'initial'}),
      performance:Immutable.Map({'isprogress':true,status:'initial'}),
      functional_test:Immutable.Map({'isprogress':true,status:'initial'}),
      build:Immutable.Map({'isprogress':true,status:'initial'})
    })
  });
export default function integrationResult(state = initIntegrationResult, action) {
  console.log("integrationResult",state);

  switch (action.type) {
    case INTEGRATION_RESULT:
      return constructResultData(action.data);
    case INTEGRATION_RESULT_CLEAR:
      return initIntegrationResult;
    case INTEGRATION_BUILD_SUCCESS:
      return initIntegrationResult;
    default: 
      return state;
  }
}



function constructResultData(rawResult) {
  let isprogress=true;
  let integrationStatus="initial";
  let resultData=rawResult.resultData;
  let buildInfo=resultData.build;
  let sonar=resultData.sonar;
  console.log("buildInfo",buildInfo);
  console.log("sonar",sonar);
  let alertStatus;
  let alertMsg;
  if(!sonar) {
    alertStatus="initial";
  }else{

    let rawMeasures = Immutable.fromJS(sonar.component.measures);

    //find error metrics
    var quality = rawMeasures.filter(measure => {
      return QUALITY_GATE.includes(measure.get('metric'));
    });
    console.log("quality",quality);
/*    let detail =  quality.find(measure =>measure.get('metric')==="quality_gate_details");
    console.log("detail",detail);*/
    let quality_gate_detail = eval("("+quality.find(measure =>measure.get('metric')==="quality_gate_details").get('value')+")").conditions;
    console.log("quality_gate_detail",quality_gate_detail);
    let error_metrics= Immutable.fromJS(quality_gate_detail).filter(condition => condition.get('level')!="OK");
    console.log("error_metrics",error_metrics);

    let statusMeasures = rawMeasures.map(err_metric=> {
      let err_condition = error_metrics.find(error_metric => {
        return error_metric.get('metric')===err_metric.get('metric');
      });
      
      if(err_condition) {//if not find
        return err_metric.set('status',err_condition.get('level')).set('condition',err_condition);
      }else{
        return err_metric.set('status','OK');
      }
      
    });

    
    var code = statusMeasures.filter(measure => {
      return CODE_METRICS.includes(measure.get('metric'));
    });
    console.log("code",code);
    var test = statusMeasures.filter(measure => {
      return TEST_METRICS.includes(measure.get('metric'));
    });
    console.log("test",test);
    var security = statusMeasures.filter(measure => {
      return SECURITY_METRICS.includes(measure.get('metric'));
    });
    console.log("security",security);
    var reliability = statusMeasures.filter(measure => {
      return RELIABILITY_METRICS.includes(measure.get('metric'));
    });
    console.log("reliability",reliability);
    var maintainability = statusMeasures.filter(measure => {
      return MAINTAINABILITY_METRICS.includes(measure.get('metric'));
    });
    console.log("maintainability",maintainability);
    var issues = statusMeasures.filter(measure => {
      return ISSUES_METRICS.includes(measure.get('metric'));
    });
    console.log("issues",issues);
    var documentation = statusMeasures.filter(measure => {
      return DOCUMENTATION_METRICS.includes(measure.get('metric'));
    });
    console.log("documentation",documentation);
    var complexity = statusMeasures.filter(measure => {
      return COMPLEXITY_METRICS.includes(measure.get('metric'));
    });
    console.log("complexity",complexity);
    var duplications = statusMeasures.filter(measure => {
      return DUPLICATIONS_METRICS.includes(measure.get('metric'));
    });
    //code
    
    for(let index in sonar.component.measures) {
   //  let metric=sonar.component.measures[index].metric;

      if(sonar.component.measures[index].metric=="alert_status") {
        console.log("get alert_status",sonar.component.measures[index]);
        alertStatus=sonar.component.measures[index].value;
        
      }else if(sonar.component.measures[index].metric=="quality_gate_details") {
        alertMsg=eval("("+sonar.component.measures[index].value+")");
      }
      if(alertStatus&&alertMsg) {
        break;
      }
    }
  }

  isprogress=buildInfo.building;
      
  //total status of this integration
  if(!isprogress) {
    if(buildInfo.result=='FAILURE'||alertStatus=="ERROR") {
      integrationStatus="critical";
    }else if(buildInfo.result=='SUCCESS'&&alertStatus=="OK") {
      integrationStatus="ok";
    }else if(buildInfo.result=='SUCCESS'&&alertStatus=="WARN") {
      integrationStatus="warning";
    }
  }
  let result = Immutable.Map({isprogress:isprogress,
    integrationStatus:integrationStatus,
    unit_test:test,
    security_test:security,
    code_review:reliability.concat(maintainability,issues,documentation,complexity,maintainability,reliability,code,duplications),
    build:Immutable.Map(buildInfo)
  });

 // console.info("result~~~", result.get('code').get(0).get('metric'));
  return result.set('barStatus',estimateIntegrationStatus(result));
  //return result;
}

function summarizeTabStatus(metricsList) {
  let status;
  let hasError = metricsList.find(metric=>{
    if(metric.get('status')!='OK') {
      console.log("!!!!!!!!!!!!!1",metric.toJS());
      return true;
    }else{
      return false;
    }
  });
  console.log('hasError',hasError);
  if(hasError===undefined) {
    console.log('hasError result success');
    status="ok";
  }else{
    console.log('hasError result error');
    status="critical";
  }

  return status;
}


function estimateIntegrationStatus(buildResult) {
  if(buildResult.get('isprogress')) {
    let progressing=Immutable.Map({"isprogress":true,"status":'initial'});
    return Immutable.Map({overview:progressing,
      code:progressing,
      unit_test:progressing,
      security_test:progressing,
      code_review:progressing,
      performance:Immutable.Map({'isprogress':true,status:'initial'}),
      functional_test:Immutable.Map({'isprogress':true,status:'initial'}),
      build:Immutable.Map({'isprogress':true,status:'initial'})
    });
  }else{
    //check if code check out correctly.
    let codeAvailableProof = Immutable.fromJS(Immutable.Map(buildResult.get('build')).get('actions')).find(action=>{
      if(action.get('buildsByBranchName')) {
        return true;
      }else{
        return false;
      }
    });
    let codeStatus_1;
    if(codeAvailableProof) {
      codeStatus_1="ok";
    }else{
      codeStatus_1="critical";
    }
    
    console.log("~~~~~~~~~~~~~~~~~~~~``",summarizeTabStatus(buildResult.get('security_test')));
    let codeStatus=Immutable.Map({"isprogress":false}).set("status",codeStatus_1);
    let unit_testStatus=Immutable.Map({"isprogress":false}).set("status",summarizeTabStatus(buildResult.get('unit_test')));
    let security_testStatus=Immutable.Map({"isprogress":false}).set("status",summarizeTabStatus(buildResult.get('security_test')));
    let code_reviewStatus=Immutable.Map({"isprogress":false}).set("status",summarizeTabStatus(buildResult.get('code_review')));
    let overview_status;
    if(codeStatus.get('status')==='critical'||unit_testStatus.get('status')==='critical'||security_testStatus.get('status')==='critical'||code_reviewStatus.get('status')==='critical') {
      overview_status=Immutable.Map({"isprogress":false}).set("status",'critical');
    }else{
      overview_status=Immutable.Map({"isprogress":false}).set("status",'ok');
    }
    return Immutable.Map({overview:overview_status,
      code:codeStatus,
      unit_test:unit_testStatus,
      security:security_testStatus,
      code_review:code_reviewStatus,
      performance:Immutable.Map({'isprogress':false,status:'ok'}),
      functional_test:Immutable.Map({'isprogress':false,status:'ok'}),
      build:Immutable.Map({'isprogress':false,status:'ok'})
  });
  }
  
}

