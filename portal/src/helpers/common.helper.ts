import { EventService } from '@app/services';
import { INotification, INotificationAction, NotificationType } from '@app/types';

export const getSizeString = (size: number) => {
  const sizeMaps = ['Bytes', 'KB', 'MB', 'GB'];

  let sizeMapIndex = 0;
  while (size > 1024 && sizeMapIndex < (sizeMaps.length - 1)) {
    size /= 1024;
    sizeMapIndex++;
  }

  return size.toFixed(2) + ' ' + sizeMaps[sizeMapIndex];
};

const categoryNatures = {
  'DI': 'Direct income',
  'DE': 'Direct expense',
  'II': 'Indirect income',
  'IE': 'Indirect expense',
};

export const getCategoryNature = (code: string) => {
  return categoryNatures[(code || '').toUpperCase()] || '';
};

export const getFullName = (firstName: string, lastName: string) => {
  return (`${firstName || ''} ${lastName || ''}`).trim();
};

export const errorHandler = (error: Error) => {
  const notification: INotification = {
    showAs: 'messagebox',
    type: 'error',
    title: 'Error',
    message: error.message,
  };

  EventService.emit(EventService.EVENT.SHOW_NOTIFICATION, notification);
};

export const showSnackbar = (options: { message: string, type: NotificationType, action?: INotificationAction }) => {
  const notification: INotification = {
    showAs: 'snackbar',
    title: '',
    ...options,
  };

  EventService.emit(EventService.EVENT.SHOW_NOTIFICATION, notification);
};
