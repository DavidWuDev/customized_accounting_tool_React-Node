import Config from '@app/config';
import { IPerson } from '@app/types';
import NetworkService from './network.service';

class AppService {
  getPersons() {
    return NetworkService.get<IPerson[]>(`${Config.SERVER_URL}/persons`);
  }
}

export default new AppService();
