import * as Koa from "koa";

interface IAuth {
  _id: string;
  issuedOn: number;
  expiredOn: number;
  username: string;
  firstName: string;
  lastName: string;
  name: string;
}

declare module "koa" {
  interface Request {
      auth: IAuth;
  }
}
