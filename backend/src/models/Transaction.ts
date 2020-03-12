import * as Mongoose from 'mongoose';

import { ITransaction } from '@app/types';

export type ITransactionModel = ITransaction & Mongoose.Document;

const TransactionSchema = new Mongoose.Schema<ITransaction>({
  transactionDate: { type: Mongoose.Schema.Types.Date, required: true },
  valueDate: { type: Mongoose.Schema.Types.Date, required: true },
  narration: { type: Mongoose.Schema.Types.String, required: false },
  reference: { type: Mongoose.Schema.Types.String, required: false },
  amount: { type: Mongoose.Schema.Types.Number, required: true },
  bankAccount: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'bank-accounts' },
  category: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: 'categories' },
  isPostDated: { type: Mongoose.Schema.Types.Boolean },
}, { timestamps: true });

export const Transaction = Mongoose.model<ITransactionModel>('transactions', TransactionSchema);

export default Transaction;
