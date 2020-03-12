import { ICondition } from './ICondition';
import { IData } from './IData';
import { ITransaction } from './ITransaction';

type RuleActionType = 'update_record';

export interface IRule extends IData {
  condition: ICondition<ITransaction>;
  actionType: RuleActionType;
  payload: any;
  order?: number;
}
