import { IconButton, Theme } from '@material-ui/core';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { withStyles } from '@material-ui/styles';
import React from 'react';

import { EventService } from '../../services';

const styles = (theme: Theme): any => ({
  root: {
    marginLeft: -12,
    marginRight: 16,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

interface IProps {
  onClick?: () => void;
}

const DrawerMenuButton: React.FC<{ classes: any } & IProps> = (props) => {
  const defaultGoBack = () => EventService.emit(EventService.EVENT.TOGGLE_DRAWER);
  const onClick: any = props.onClick || defaultGoBack;

  return (
    <IconButton color="inherit" onClick={onClick} className={props.classes.root}>
      <MenuOutlinedIcon />
    </IconButton>
  );
};

export default withStyles(styles)(DrawerMenuButton);
