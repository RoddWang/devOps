import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';

import { hashHistory } from 'react-router';

export default class CD extends Component {

  _onClose() {
    hashHistory.goBack();
  }
  render () {
    //let {project, application} = this.props;
    console.log("CI props",this.props);
  //  let {project,application,integrationRecord} = this.props;
   
    return (
      <Layer onClose={this._onClose} closer={true} flush={true}>
        <iframe src="http://c9t17878.itcs.hpecorp.net:9999/" id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
      </Layer>
    );
  }
}
