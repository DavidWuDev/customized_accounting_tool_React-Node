import { IData } from './IData';

export interface ICategory extends IData {
  nature?: 'DI' | 'DE' | 'II' | 'IE';
}
