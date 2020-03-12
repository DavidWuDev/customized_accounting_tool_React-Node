import { Category } from '@app/models';
import DataController from './data.controller';

export default new DataController('category', Category, { pluralName: 'categories' });
