import * as Mongoose from 'mongoose';

import { IBank } from '@app/types';

export type IBankModel = IBank & Mongoose.Document;

const BankSchema = new Mongoose.Schema<IBank>({
  name: { type: Mongoose.Schema.Types.String, required: true },
  aliasName: { type: Mongoose.Schema.Types.String, required: true },
}, { timestamps: true });

export const Bank = Mongoose.model<IBankModel>('banks', BankSchema);

export default Bank;
