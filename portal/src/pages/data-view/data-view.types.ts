import { IData, IDataService } from '@app/types';

export interface IColumn<T> {
  title: string;
  name: keyof T;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  transform?: (value: any, record: T) => any;
}

export interface IDataViewProps<T extends IData, P> {
  name: string;
  pluralName?: string;
  service: IDataService<T, P>;
  populate?: P;
  title: string;
  pluralTitle?: string;
  columns: Array<IColumn<T>>;
  allowView?: boolean;
  allowAdd?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  showMoreActions?: boolean;
  dataTransformer?: (item: T) => T;
}
