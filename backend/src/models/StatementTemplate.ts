import * as Mongoose from 'mongoose';

import { IStatementTemplate } from '@app/types';

export type IStatementTemplateModel = IStatementTemplate & Mongoose.Document;

const StatementSchema = new Mongoose.Schema<IStatementTemplate>({
  name: { type: Mongoose.Schema.Types.String, required: true },
  code: { type: Mongoose.Schema.Types.String, required: true },
  bank: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'banks' },
  extension: { type: Mongoose.Schema.Types.String, required: true },
}, { timestamps: true });

export const StatementTemplate = Mongoose.model<IStatementTemplateModel>('statement-templates', StatementSchema);

export default StatementTemplate;
