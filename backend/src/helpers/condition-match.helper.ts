import { ICondition } from '@app/types';

export const isConditionMatch = <T>(record: T, condition: ICondition<T>) => {
  if (typeof record !== 'object') {
    return false;
  }

  if (typeof condition !== 'object') {
    throw new Error('Invalid condition');
  }

  const keys = Object.keys(condition);

  return keys.every((key) => {
    if (!key.startsWith('_$')) {
      if (typeof condition[key] !== 'object') {
        return record[key] === condition[key];
      } else {
        if (Object.keys(condition[key]).length !== 1) {
          throw new Error('Invalid condition');
        }

        const operator = Object.keys(condition[key])[0];

        switch (operator) {
          case '_$gt':
            return record[key] > condition[key][operator];
          case '_$gte':
            return record[key] >= condition[key][operator];
          case '_$lt':
            return record[key] < condition[key][operator];
          case '_$lte':
            return record[key] <= condition[key][operator];
          case '_$content':
            return record[key]
              && typeof record[key] === 'string'
              && record[key].toLowerCase().indexOf(condition[key][operator].toLowerCase()) !== -1;
          case '_$eq':
            if (condition[key][operator] === null) {
              return !record[key];
            }
            return record[key] === condition[key][operator];
          case '_$ne':
            if (condition[key][operator] === null) {
              return !!record[key];
            }
            return record[key] !== condition[key][operator];
          default:
            throw new Error('Invalid operator');
        }
      }
    } else {
      switch (key) {
        case '_$and':
          if (!Array.isArray(condition[key])) {
            throw new Error('Invalid condition');
          }
          return condition[key].every((item) => isConditionMatch(record, item));
        case '_$or':
          if (!Array.isArray(condition[key])) {
            throw new Error('Invalid condition');
          }
          return condition[key].some((item) => isConditionMatch(record, item));
        default:
          throw new Error('Invalid condition');
      }
    }
  });
};
