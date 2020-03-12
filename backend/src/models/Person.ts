import * as Mongoose from 'mongoose';

import { IPerson } from '@app/types';

export type IPersonModel = IPerson & Mongoose.Document;

const PersonSchema = new Mongoose.Schema<IPerson>({
  firstName: { type: Mongoose.Schema.Types.String, required: true },
  lastName: { type: Mongoose.Schema.Types.String, required: true },
  pan: { type: Mongoose.Schema.Types.String, required: true },
  monthlyIncome: { type: Mongoose.Schema.Types.Number, required: false },
}, { timestamps: true, toJSON: { virtuals: true } });

PersonSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

PersonSchema.virtual('name').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export const Person = Mongoose.model<IPersonModel>('persons', PersonSchema);

export default Person;
