import EventEmitter from 'event-emitter';

const TYPE = {
  TOGGLE_DRAWER: '@event/TOGGLE_DRAWER',
  SHOW_NOTIFICATION: '@event/SHOW_NOTIFICATION',
};

class EventService {
  public EVENT = TYPE;
  private emitter = EventEmitter();

  emit(eventName: string, ...args: any[]) {
    this.emitter.emit(eventName, ...args);
  }

  addListener(eventName: string, fn: (...args: any[]) => void) {
    this.emitter.on(eventName, fn);
  }

  removeListener(eventName: string, fn: (...args: any[]) => void) {
    this.emitter.off(eventName, fn);
  }
}

export default new EventService();
