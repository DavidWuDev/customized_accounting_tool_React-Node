import * as assert from 'assert';
import { isConditionMatch } from './condition-match.helper';

it('Condition 1', () => {
  const record = {
    narration: 'Hello test',
    amount: 1,
  };

  const condition = {
    $or: [{ narration: { $content: 'test' } }],
    amount: { $gt: 0 },
  };

  assert.equal(isConditionMatch(record, condition), true);
});

// const rules = [
//   {
//     condition: {
//       narration: { $content: 'upwork' },
//     },
//     action: {
//       newCategory: 'DIRECT INCOME',
//     },
//   },
//   {
//     condition: {
//       narration: { $content: 'rent' },
//     },
//     action: {
//       newCategory: 'HOUSE RENT',
//     },
//   },
//   {
//     condition: {
//       narration: { $content: 'atm wdl' },
//       amount: { $gte: 10000 },
//     },
//     action: {
//       newCategory: 'WDL10',
//     },
//   },
//   {
//     condition: {
//       narration: { $content: 'atm wdl' },
//       amount: { $lt: 10000 },
//     },
//     action: {
//       newCategory: 'WDL',
//     },
//   },
// ];
