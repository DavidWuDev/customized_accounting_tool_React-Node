import { IData } from '@app/types';

export interface IGetCountOptions<T> {
  query?: Partial<T>;
}

export interface IGetListOptions<T, P> {
  query?: Partial<T>;
  populate?: P;
  skip?: number;
  limit?: number;
  sort?: string;
}

export interface IDataService<T extends IData, P> {
  getList: (options?: IGetListOptions<T, P>) => Promise<T[]>;
  get: (id: string, populate?: P) => Promise<T>;
  save: (record: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
  lookup: () => Promise<IData[]>;
}
