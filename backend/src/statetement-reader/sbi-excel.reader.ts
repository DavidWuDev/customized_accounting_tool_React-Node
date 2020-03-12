import * as fs from 'fs';

import { ITransaction } from 'types';
import { IStatemenentReader } from './interfaces';

class StatementReaderSBIExcel implements IStatemenentReader {
  public async read(source: string | Buffer): Promise<ITransaction[]> {
    let data: string;
    if (typeof source === 'string') {
      data = fs.readFileSync(source, 'utf-8');
    } else {
      data = source.toString();
    }

    data = data.substr(data.indexOf('Txn Date'));
    data = data.substr(data.indexOf('\n'));
    data = data.substring(0, data.indexOf('**This is a computer generated statement and does not require a signature'));
    const lines = data.split('\n')
      .map(x => x.trim())
      .filter(x => Boolean(x))
      .map(x => x.split('\t').map(y => y.trim()))
      .map(x => {
        const transaction: ITransaction = {
          _id: null,
          name: '',
          transactionDate: new Date(x[0]),
          valueDate: new Date(x[1]),
          narration: x[2],
          reference: x[3],
          amount: x[4] ? -Number(x[4].replace(/,/g, '')) : Number(x[5].replace(/,/g, '')),
          bankAccount: null,
        };

        return transaction;
      });
    return lines;
  }
}

export default StatementReaderSBIExcel;
