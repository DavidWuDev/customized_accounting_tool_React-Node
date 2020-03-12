import { IBank } from './IBank';
import { IData } from './IData';

export interface IStatementTemplate extends IData {
  code: string;
  bank: IBank | string;
  extension: string;
}
