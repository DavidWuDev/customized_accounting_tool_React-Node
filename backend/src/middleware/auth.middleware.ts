import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as Koa from 'koa';

const authMiddleware = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const authorization = ctx.get('Authorization');
  let token: string;
  let authInfo: any;
  if (authorization) {
    token = authorization.replace(/^bearer /gi, '');
  }

  if (token) {
    try {
      jwt.verify(token, config.get<any>('jwt').secret);
    } catch {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: 'Unauthorized request',
        path: ctx.path,
      };
      return;
    }

    authInfo = jwt.decode(token);
  }

  if (authInfo && Date.now() > authInfo.expiredOn) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: 'Unauthorized request',
      path: ctx.path,
    };
    return;
  }

  if (!authInfo) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: 'Unauthorized request',
      path: ctx.path,
    };
    return;
  }

  ctx.request.auth = authInfo;

  await next();
};

export default authMiddleware;
