import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import View from '../view.component';
import BackButton from './back-button.component';
import DrawerMenuButton from './drawer-menu-button.component';
import { IHeaderProps } from './header.types';
import IconButton from './icon-button.component';

class Header extends Component<IHeaderProps> {
  static BackButton = BackButton;
  static IconButton = IconButton;

  render() {
    const { title, leftComponent, rightComponent, drawerMenu } = this.props;
    return (
      <AppBar position="relative">
        <Toolbar>
          {drawerMenu && <DrawerMenuButton />}
          {Boolean(leftComponent) && (
            <View style={{ marginLeft: -12, marginRight: 16 }}>
              {leftComponent}
            </View>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {Boolean(rightComponent) && (
            <View style={{ marginLeft: 16, marginRight: -12 }}>
              {rightComponent}
            </View>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
