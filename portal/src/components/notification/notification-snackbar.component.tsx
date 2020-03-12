import { INotification } from '@app/types';
import Button from '@material-ui/core/Button';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface IProps {
  notification: INotification;
  open: boolean;
  onClose: () => void;
}

export default function CustomizedSnackbars(props: IProps) {
  const classes = useStyles(props);
  const { open, notification } = props;

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.onClose();
  };

  const handleActionClick = () => {
    props.onClose();
    notification.action.onClick && notification.action.onClick();
  };

  const Icon = variantIcon[notification.type];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[notification.type]}
        message={
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {notification.message}
          </span>
        }
        action={[
          Boolean(notification.action) && (
            <Button key="undo" color="inherit" size="small" onClick={handleActionClick}>
              {notification.action.title}
            </Button>
          ),
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
