import React, { useEffect, useState } from 'react';
import EventService from '../../services/event.service';
import { INotification } from '../../types';
import NotificationMessageBox from './notification-message-box.component';
import NotificationSnackbar from './notification-snackbar.component';

const initialMessageBoxNotification: INotification = {
  showAs: 'messagebox',
  type: 'error',
  title: '',
  message: '',
};

const NotificationComponent: React.FC = (props) => {
  const [messageBoxNotification, setMessageBoxNotification] = useState<INotification>(initialMessageBoxNotification);
  const [visibleMessageBox, setVisibleMessageBox] = useState(false);
  const [snackbarNotification, setSnackbarNotification] = useState<INotification>(initialMessageBoxNotification);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  useEffect(() => {
    EventService.addListener(EventService.EVENT.SHOW_NOTIFICATION, handleEvent);

    return () => {
      EventService.removeListener(EventService.EVENT.SHOW_NOTIFICATION, handleEvent);
    };
  }, []);

  const handleEvent = (notification: INotification) => {
    if (notification.showAs === 'messagebox') {
      setMessageBoxNotification(notification);
      setVisibleMessageBox(true);
    } else if (notification.showAs === 'snackbar') {
      setSnackbarNotification(notification);
      setVisibleSnackbar(true);
    }
  };

  return (
    <React.Fragment>
      <NotificationMessageBox
        open={visibleMessageBox}
        notification={messageBoxNotification}
        onClose={() => setVisibleMessageBox(false)}
      />
      <NotificationSnackbar
        open={visibleSnackbar}
        notification={snackbarNotification}
        onClose={() => setVisibleSnackbar(false)}
      />
    </React.Fragment>
  );
};

export default NotificationComponent;
