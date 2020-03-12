import { IBankAccount } from './IBankAccount';
import { ICategory } from './ICategory';
import { IData } from './IData';

export interface ITransaction extends IData {
  transactionDate: Date;
  valueDate: Date;
  narration: string;
  reference: string;
  amount: number;
  bankAccount: IBankAccount | string;
  category?: ICategory | string;
  isPostDated?: boolean;
}
