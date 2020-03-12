import { Rule } from '@app/models';
import RuleController from './data.controller';

export default new RuleController('rule', Rule, { delete: true });
