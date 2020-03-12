import Config from '@app/config';
import { IData, IDataService, IGetCountOptions, IGetListOptions } from '@app/types';
import NetworkService from './network.service';

class DataService<T extends IData, P extends string = any> implements IDataService<T, P> {
  protected name: string;
  protected pluralName: string;

  protected _cachedLookup: IData[] = null;
  
  constructor(name: string, pluralName?: string) {
    this.name = name;
    this.pluralName = pluralName || name + 's';
  }

  getList(options?: IGetListOptions<T, P>): Promise<T[]> {
    let url = `${Config.SERVER_URL}/${this.pluralName}`;
    const queryParams: any = {};

    const { query, populate, skip, limit, sort } = options || {} as IGetListOptions<T, P>;
    if (query) {
      queryParams.query = encodeURIComponent(JSON.stringify(query));
    }

    if (populate) {
      queryParams.populate = encodeURIComponent(populate);
    }

    if (sort) {
      queryParams.sort = encodeURIComponent(sort);
    }

    if (skip) {
      queryParams.skip = skip;
    }

    if (limit) {
      queryParams.limit = limit;
    }

    if (Object.keys(queryParams).length) {
      url += '?' + Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
    }

    return NetworkService.get<T[]>(url);
  }

  async getCount(options?: IGetCountOptions<T>): Promise<number> {
    let url = `${Config.SERVER_URL}/${this.pluralName}/count`;
    const queryParams: any = {};

    const { query } = options || {} as IGetCountOptions<T>;
    if (query) {
      queryParams.query = encodeURIComponent(JSON.stringify(query));
    }

    if (Object.keys(queryParams).length) {
      url += '?' + Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
    }

    const result = await NetworkService.get<{
      count: number;
    }>(url);
    return result.count;
  }

  get(id: string, populate?: P) {
    let url = `${Config.SERVER_URL}/${this.name}/${id}`;
    const queryParams: any = {};

    if (populate) {
      queryParams.populate = encodeURIComponent(populate);
    }

    if (Object.keys(queryParams).length) {
      url += '?' + Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`);
    }

    return NetworkService.get<T>(url);
  }

  save(record: T): Promise<T> {
    let url = `${Config.SERVER_URL}/${this.name}`;

    if (record._id) {
      url += `/${record._id}`;
    }

    this._cachedLookup = null;
    return NetworkService.post<T>(url, record);
  }

  async delete(id: string) {
    this._cachedLookup = null;
    await NetworkService.delete(`${Config.SERVER_URL}/${this.name}/${id}`);
  }

  async lookup() {
    if (this._cachedLookup) {
      return this._cachedLookup;
    }

    this._cachedLookup = await NetworkService.get<IData[]>(`${Config.SERVER_URL}/${this.pluralName}/lookup`);

    return this._cachedLookup;
  }
}

export default DataService;
