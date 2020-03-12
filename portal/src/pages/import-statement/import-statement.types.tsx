import { IBankAccount, IPerson, IStatementTemplate } from '@app/types';

export interface IAccountInfo {
  person?: IPerson;
  bankAccount?: IBankAccount;
  template?: IStatementTemplate;
}
