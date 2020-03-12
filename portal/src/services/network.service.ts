import axios, { AxiosError, AxiosResponse } from 'axios';

import history from '../helpers/history.helper';
import AuthService from './auth.service';
import LogService from './log.service';

const logger = LogService.getInstance('service:network');

export interface IUploadSnapshot {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

const MESSAGES = {
  OFFLINE: 'You are offline, Please connect internet',
  NOT_REACHABLE: 'We are not able to connect to server at the moment',
  UNKNOWN: 'Something went wrong, Please contact to administrator',
  REQUEST_CANCELLED: 'request cancelled by user',
  SESSION_EXPIRED: 'Session expired',
};

interface IOptions {
  external?: boolean;
  headers?: { [key: string]: string };
  onUploadProgress?: (snapshot: IUploadSnapshot) => void;
}

class NetworkService {
  private handleError<T>(error: AxiosError<T> | NetworkError) {
    if (error instanceof NetworkError) {
      throw error;
    }

    if (error.message === 'Network Error') {
      throw new NetworkError(MESSAGES.NOT_REACHABLE);
    }

    if (error.response) {
      if (error.response.status === 401) {
        AuthService.logout();
        history.replace(`/login?redirect=${encodeURIComponent(history.location.pathname)}`);
        throw new NetworkError(MESSAGES.SESSION_EXPIRED);
      }

      logger.error(error.response);
      throw new NetworkError(MESSAGES.UNKNOWN);
    }

    logger.error(error.response);
    throw new NetworkError(MESSAGES.UNKNOWN);
  }

  private handleResponse<T>(response: AxiosResponse<T>) {
    if (response.status !== 200 && response.status !== 201) {
      logger.error(response);
      throw new NetworkError(MESSAGES.UNKNOWN);
    }

    return response.data;
  }

  private getHeader(options?: IOptions) {
    const header: { [key: string]: string } = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token = AuthService.getToken();
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }

    return header;
  }

  async get<T = any>(url: string, options?: IOptions) {
    logger.debug('get', url);
    try {
      const response = await axios.get<T>(url, {
        headers: this.getHeader(options),
      });
      logger.debug('get response', response);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<T = any, D = any>(url: string, data: D, options?: IOptions) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post<T>(url, data, {
        headers: this.getHeader(options),
        onUploadProgress: progressEvent => {
          if (options && options.onUploadProgress) {
            options.onUploadProgress({
              lengthComputable: progressEvent.lengthComputable,
              loaded: progressEvent.loaded,
              total: progressEvent.total,
            });
          }
        },
      });
      logger.debug('post response', response);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async put<T = any, D = any>(url: string, data: D, options?: IOptions) {
    logger.debug('put', url, data);
    try {
      const response = await axios.put<T>(url, data, {
        headers: this.getHeader(options),
      });
      logger.debug('put response', response);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<T = any, D = any>(url: string, data?: D, options?: IOptions) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete<T>(url, {
        headers: this.getHeader(options),
        data,
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

// tslint:disable-next-line:max-classes-per-file
class NetworkError extends Error { }

export default new NetworkService();
