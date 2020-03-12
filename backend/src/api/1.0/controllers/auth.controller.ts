import { User } from '@app/models';
import { IController, IControllerRoute } from '@app/types';
import * as Config from 'config';
import * as Crypto from 'crypto';
import * as Jwt from 'jsonwebtoken';
import * as Koa from 'koa';

class DataController implements IController {
  public routes: IControllerRoute[] = [];

  constructor() {
    this.routes.push({ method: 'POST', path: '/login', handler: this.Login });
  }

  public Login = async (ctx: Koa.Context) => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.throw(400);
    }

    const user = await User.findOne({ username });

    if (!user) {
      ctx.body = {
        success: false,
        message: 'Invalid username or password',
      };
      return;
    }

    const hash = Crypto.createHmac('sha512', Config.get<any>('crypto').secret);

    if (hash.update(password).digest('hex') !== user.password) {
      ctx.body = {
        success: false,
        message: 'Invalid username or password',
      };
      return;
    }

    const expiredOn = Date.now() + 1000 * 60 * 60;
    const authInfo = {
      _id: user._id.toJSON(),
      issuedOn: Date.now(),
      expiredOn,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
    };

    const token = Jwt.sign(
      JSON.stringify(authInfo),
      Config.get<any>('jwt').secret,
    );

    ctx.body = {
      success: true,
      data: {
        token,
        ...authInfo,
      },
    };
  }
}

export default new DataController();
