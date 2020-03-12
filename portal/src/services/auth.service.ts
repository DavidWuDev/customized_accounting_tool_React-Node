import Config from '@app/config';
import { IAuth } from '@app/types';
import { NetworkService } from '.';

const AUTH_KEY_LOCALSTORAGE = 'cashflow_auth';

interface IAuthInfoSession extends IAuth {
  token: string;
}

class AuthService {
  _auth: IAuthInfoSession;

  constructor() {
    const authString = localStorage.getItem(AUTH_KEY_LOCALSTORAGE);
    if (authString) {
      this._auth = JSON.parse(authString);
    }
  }

  public isAuthenticated() {
    if (!this._auth) {
      return false;
    }

    if (Date.now() > this._auth.expiredOn) {
      localStorage.removeItem(AUTH_KEY_LOCALSTORAGE);
      this._auth = undefined;
      return false;
    }

    return true;
  }

  getToken() {
    if (!this._auth) {
      return null;
    }

    return this._auth.token;
  }

  public async login({ username, password }): Promise<boolean> {
    try {
      const result = await NetworkService.post(`${Config.SERVER_URL}/login`, {
        username,
        password,
      });

      if (!result.success) {
        return false;
      }

      this._auth = result.data;
      localStorage.setItem(AUTH_KEY_LOCALSTORAGE, JSON.stringify(this._auth));
      return true;
    } catch {
      return false;
    }
  }

  async logout() {
    localStorage.removeItem(AUTH_KEY_LOCALSTORAGE);
    this._auth = undefined;
  }
}

export default new AuthService();
