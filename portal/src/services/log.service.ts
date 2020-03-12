import Config from '@app/config';

class LogService {
  private _key: string;
  private _console: Console;
  constructor(key: string) {
    this._key = key;

    if (Config.DEBUG) {
      this._console = console;
    } else {
      this._console = {
        error: () => undefined,
        info: () => undefined,
        log: () => undefined,
        warn: () => undefined,
        debug: () => undefined,
      } as any;
    }
  }

  error(message?: any, ...optionalParams: any[]): void {
    this._console.log(`error:${this._key}`, message, ...optionalParams);
  }
  info(message?: any, ...optionalParams: any[]): void {
    this._console.log(`info:${this._key}`, message, ...optionalParams);
  }
  log(message?: any, ...optionalParams: any[]): void {
    this._console.log(`log:${this._key}`, message, ...optionalParams);
  }
  warn(message?: any, ...optionalParams: any[]): void {
    this._console.log(`warn:${this._key}`, message, ...optionalParams);
  }
  debug(message?: any, ...optionalParams: any[]): void {
    this._console.debug(`debug:${this._key}`, message, ...optionalParams);
  }

  getInstance(key: string) {
    return new LogService(`${this._key}:${key}`);
  }
}

export default new LogService('app');
