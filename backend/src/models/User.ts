import * as Mongoose from 'mongoose';

import { IUser } from '@app/types';

export type IUserModel = IUser & Mongoose.Document;

const UserSchema = new Mongoose.Schema<IUser>({
  firstName: { type: Mongoose.Schema.Types.String, required: true },
  lastName: { type: Mongoose.Schema.Types.String, required: true },
  username: { type: Mongoose.Schema.Types.String, required: true },
  password: { type: Mongoose.Schema.Types.String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

UserSchema.virtual('name').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export const User = Mongoose.model<IUserModel>('users', UserSchema);

export default User;
