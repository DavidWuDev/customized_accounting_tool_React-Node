import * as Mongoose from 'mongoose';

import { IBank as ICategory } from '@app/types';

export type ICategoryModel = ICategory & Mongoose.Document;

const CategorySchema = new Mongoose.Schema<ICategory>({
  name: { type: Mongoose.Schema.Types.String, required: true },
  nature: { type: Mongoose.Schema.Types.String, required: false },
}, { timestamps: true });

export const Category = Mongoose.model<ICategoryModel>('categories', CategorySchema);

export default Category;
