import React, {Component} from 'react';
import {Steps} from 'antd';

const {Step} = Steps;

class StepNumber extends Component {
  render() {
    return (
        <Steps current={this.props.stepNumber}>
          <Step title="Образование"/>
          <Step title="Опыт работы"/>
          <Step title="Контактные данные"/>
        </Steps>
    );

  }
}

export default StepNumber;