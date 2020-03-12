export interface IRowValue<T = string> {
  field: string;
  operator: string;
  value: T;
}

export interface IGroupValue {
  type: '_$and' | '_$or';
  conditions: Array<IRowValue | IGroupValue>;
}
