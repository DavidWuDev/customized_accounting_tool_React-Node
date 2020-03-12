import { ITransaction } from 'types';

export interface IStatemenentReader {
  read: (source: string | Buffer) => Promise<ITransaction[]>;
}
