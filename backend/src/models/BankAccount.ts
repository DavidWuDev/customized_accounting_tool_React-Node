import * as Mongoose from 'mongoose';

import { IBankAccount } from '@app/types';

export type IBankAccountModel = IBankAccount & Mongoose.Document;

const BankAccountSchema = new Mongoose.Schema<IBankAccount>({
  bank: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'banks' },
  bankAccountAliasName: { type: Mongoose.Schema.Types.String, required: true },
  accountName: { type: Mongoose.Schema.Types.String, required: true },
  accountNumber: { type: Mongoose.Schema.Types.String, required: true },
  branch: { type: Mongoose.Schema.Types.String, required: true },
  openingBalance: { type: Mongoose.Schema.Types.Number, required: true },
  ifsc: { type: Mongoose.Schema.Types.String, required: true },
  accountHolder: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'persons' },
}, { timestamps: true, toJSON: { virtuals: true } });

BankAccountSchema.virtual('name').get(function() {
  return this.bankAccountAliasName;
});

export const BankAccount = Mongoose.model<IBankAccountModel>('bank-accounts', BankAccountSchema);

export default BankAccount;
