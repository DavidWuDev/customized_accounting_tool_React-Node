import * as Koa from 'koa';

declare module '@koa/multer';

declare module 'koa' {
  interface Request {
    files: Array<{
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    }>;
  }
}
