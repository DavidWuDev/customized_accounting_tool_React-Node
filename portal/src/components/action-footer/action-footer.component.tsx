import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import React, { Component } from 'react';

import View from '../view.component';
import ActionButton from './action-button.component';

interface IProps {
  className?: string;
}

class ActionFooter extends Component<IProps> {
  static ActionButton = ActionButton;

  render() {
    return (
      <View className={this.props.className}>
        <Divider />
        <Toolbar>
          {this.props.children}
        </Toolbar>
      </View>
    );
  }
}

export default ActionFooter;
