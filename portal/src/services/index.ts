import { IBank, IBankAccount, ICategory, IPerson, IRule, IStatementTemplate } from '@app/types';
import DataService from './data.service';

export { default as NetworkService } from './network.service';

export { default as AppService } from './app.service';
export { default as AuthService } from './auth.service';
export { default as EventService } from './event.service';

export const PersonService = new DataService<IPerson>('person');
export const BankService = new DataService<IBank>('bank');
export const BankAccountService = new DataService<IBankAccount>('bank-account');
export const StatementTemplateService = new DataService<IStatementTemplate, 'bank'>('statement-template');
export const CategoryService = new DataService<ICategory>('category', 'categories');
export const RuleService = new DataService<IRule>('rule');
export { default as TransactionService } from './transaction.service';
