import * as fs from 'fs';
import * as Koa from 'koa';
import * as KoaSend from 'koa-send';

const portalServe = (root: string) => {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    if (ctx.path === '/alive') {
      ctx.body = {
        status: 'ok',
        timestamp: Date.now(),
      };
      return;
    }

    if (ctx.path.startsWith('/api')) {
      await next();
      return;
    }

    const fileExists = await isFileExists(`${root}${ctx.path}`);

    if (fileExists) {
      await KoaSend(ctx, ctx.path, { root });
    } else {
      await KoaSend(ctx, `/index.html`, { root });
    }

    // ctx.status = 404;
    // ctx.body = '<h1>Requested path not found</h1>';
  };
};

const isFileExists = (path: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (!exists) {
        resolve(false);
      } else {
        fs.stat(path, (err, stat) => {
          if (err) {
            reject(err);
          } else {
            if (stat.isFile()) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      }
    });
  });
};

export default portalServe;
