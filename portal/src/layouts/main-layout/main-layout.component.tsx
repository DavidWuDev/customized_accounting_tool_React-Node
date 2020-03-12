import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthService, EventService } from '@app/services';

import history from '../../helpers/history.helper';
import DrawerItems from './drawer-items.component';
import styles from './main-layout.styles';

import { AppLogo } from '@app/assets/icons';
import Config from '@app/config';
import { IconButton, ListItemIcon } from '@material-ui/core';
import { IProps, IPropsExtended, IState } from './main-layout.types';

const INITIAL_MINI_STATE_STORE_KEY = 'mini-drawer';
let initialMiniState = localStorage.getItem(INITIAL_MINI_STATE_STORE_KEY) === 'true';

class MainLayout extends Component<IProps & IPropsExtended, IState> {
  static defaultProps: IProps = {
    layoutRef: () => null,
    title: 'App',
    headerProps: {},
  };

  state: IState = {
    redirect: null,
    drawerOpen: false,
    mini: initialMiniState,
  };

  componentDidMount() {
    this.props.layoutRef(this);
    EventService.addListener(EventService.EVENT.TOGGLE_DRAWER, this.handleToggleDrawer);
  }

  componentWillUnmount() {
    EventService.removeListener(EventService.EVENT.TOGGLE_DRAWER, this.handleToggleDrawer);
  }

  handleToggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  openDrawer = () => {
    this.handleOpenDrawer();
  }

  handleOpenDrawer = () => {
    this.setState({
      drawerOpen: true,
    });
  }

  handleCloseDrawer = () => {
    this.setState({
      drawerOpen: false,
    });
  }

  handleToggleMini = () => {
    initialMiniState = !initialMiniState;
    this.setState((prevState) => ({
      mini: !prevState.mini,
    }), () => {
      localStorage.setItem(INITIAL_MINI_STATE_STORE_KEY, String(this.state.mini));
    });
  }

  handleLogout = () => {
    AuthService.logout();
    history.push('/login');
  }

  renderDrawer() {
    const { classes } = this.props;
    let drawerVariant: any = 'temporary';
    let mini = false;
    let headerMenuHandler = this.handleCloseDrawer;
    if (isWidthUp('md', this.props.width)) {
      drawerVariant = 'permanent';
      mini = this.state.mini;
      headerMenuHandler = this.handleToggleMini;
    }

    return (
      <Drawer
        variant={drawerVariant}
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerMini]: mini,
          }),
        }}
        anchor="left"
        open={this.state.drawerOpen}
        onClose={this.handleCloseDrawer}
      >
        <div style={{ display: 'flex' }}>
          <div className={classNames(classes.toolbar, classes.drawerHeader)}>
            <IconButton style={{ marginLeft: -12, marginRight: 16 }} onClick={headerMenuHandler} className={classes.miniToggleButton}>
              <MenuOutlinedIcon />
            </IconButton>
            <AppLogo color="primary" className={classes.minLogo} />
            <AppLogo color="primary" />
            <Typography variant="h6" className={classes.drawerHeaderTitle}>
              Cashflow
            </Typography>
            <Typography variant="caption" color="textSecondary"> ({Config.VERSION})</Typography>
          </div>
        </div>
        <Divider />
        <DrawerItems />
        <Divider />
        <List disablePadding>
          <ListItem className={classes.toolbar} button onClick={this.handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" style={{ fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} />
          </ListItem>
        </List>
      </Drawer>
    );
  }

  renderBody() {
    const { classes, children } = this.props;

    return (
      <main className={classes.content}>
        {children}
      </main>
    );
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className={classes.root}>
        {this.renderDrawer()}
        {this.renderBody()}
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(MainLayout));
