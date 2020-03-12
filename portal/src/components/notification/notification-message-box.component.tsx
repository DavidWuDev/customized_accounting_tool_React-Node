import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Theme, Typography } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/ErrorOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { INotification, NotificationType } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  messageContainer: {
    paddingTop: 16,
    paddingBottom: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
  },
  titleError: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  contentError: {
    color: theme.palette.error.main,
  },
  titleWarning: {
    backgroundColor: '#FF8800',
    color: 'white',
  },
  contentWarning: {
    color: '#FF8800',
  },
  titleInfo: {
    backgroundColor: '#0099CC',
    color: 'white',
  },
  contentInfo: {
    color: '#0099CC',
  },
  titleSuccess: {
    backgroundColor: '#007E33',
    color: 'white',
  },
  contentSuccess: {
    color: '#007E33',
  },
  icon: {
    marginRight: 16,
  },
}));

interface IMappping {
  titleClass: string;
  contentClass: string;
  icon: React.ComponentType<SvgIconProps>;
}

const mappings: { [key in NotificationType]: IMappping } = {
  error: {
    titleClass: 'titleError',
    contentClass: 'contentError',
    icon: ErrorIcon,
  },
  warning: {
    titleClass: 'titleWarning',
    contentClass: 'contentWarning',
    icon: WarningIcon,
  },
  info: {
    titleClass: 'titleInfo',
    contentClass: 'contentInfo',
    icon: InfoIcon,
  },
  success: {
    titleClass: 'titleSuccess',
    contentClass: 'contentSuccess',
    icon: SuccessIcon,
  },
};

interface IProps {
  notification: INotification;
  open: boolean;
  onClose: () => void;
}

const NotificationMessageBox: React.FC<IProps> = (props) => {
  const classes = useStyles(props);

  const { open, notification, onClose } = props;

  if (!notification) {
    return null;
  }

  const messageMap = mappings[notification.type];

  const Icon = notification.icon === null ? null : notification.icon || messageMap.icon;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <DialogTitle className={classes[messageMap.titleClass]}>{notification.title}&nbsp;</DialogTitle>
      <DialogContent dividers>
        <div className={classNames(classes.messageContainer, classes[messageMap.contentClass])}>
          {Boolean(Icon) &&
            <div className={classes.icon}>
              <Icon fontSize="large" />
            </div>
          }
          <Typography>
            {notification.message}&nbsp;
            </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationMessageBox;
