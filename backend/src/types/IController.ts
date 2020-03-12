import * as Koa from 'koa';

export type HttpMethod = 'GET' | 'POST' | 'DELETE';

export interface IControllerRoute {
  method: HttpMethod;
  path: string;
  handler: (ctx: Koa.Context) => Promise<void>;
  middleware?: Koa.Middleware;
}

export interface IController {
  routes: IControllerRoute[];
}
