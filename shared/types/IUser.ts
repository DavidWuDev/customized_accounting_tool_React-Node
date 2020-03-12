import { IData } from './IData';

export interface IUser extends IData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
