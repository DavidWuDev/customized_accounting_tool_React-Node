import { IBank } from './IBank';
import { IData } from './IData';
import { IPerson } from './IPerson';

export interface IBankAccount extends IData {
  bank: IBank | string;
  bankAccountAliasName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  openingBalance: number; // Should be zero
  ifsc: string;
  accountHolder: IPerson | string;
}
