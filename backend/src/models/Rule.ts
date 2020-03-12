import * as Mongoose from 'mongoose';

import { IRule } from '@app/types';

export type IRuleModel = IRule & Mongoose.Document;

const RuleSchema = new Mongoose.Schema<IRule>({
  name: { type: Mongoose.Schema.Types.String, required: true },
  condition: { type: Mongoose.Schema.Types.Mixed, required: true },
  actionType: { type: Mongoose.Schema.Types.String, required: true },
  payload: { type: Mongoose.Schema.Types.Mixed, required: false },
  order: { type: Mongoose.Schema.Types.Number, required: false },
  inactive: { type: Mongoose.Schema.Types.Boolean, required: false },
}, { timestamps: true });

export const Rule = Mongoose.model<IRuleModel>('rules', RuleSchema);

export default Rule;
