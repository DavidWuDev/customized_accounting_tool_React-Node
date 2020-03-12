import { FunctionComponent } from 'react';

export type NotificationType = 'error' | 'warning' | 'info' | 'success';
export type NotificationShowAs = 'messagebox' | 'snackbar';

export interface INotificationAction {
  title: string;
  onClick: () => void;
}

export interface INotification {
  showAs: NotificationShowAs;
  type: NotificationType;
  icon?: FunctionComponent;
  title: string;
  message: string;
  action?: INotificationAction;
}
