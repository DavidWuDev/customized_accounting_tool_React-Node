type Operator = '_$gt' | '_$content' | '_$in';
type LogicalOperator = '_$and' | '_$or';

type IConditionBase<T extends {}> = {
  [P in keyof T]?: T[P] | {
    [O in Operator]?: T[P];
  };
};

type IConditionLogical<T extends {}> = {
  [O in LogicalOperator]?: Array<IConditionBase<T>>
};

export type ICondition<T extends {}> = IConditionBase<T> & IConditionLogical<T>;
