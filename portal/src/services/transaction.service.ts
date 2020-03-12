import Config from '@app/config';
import { ITransaction } from '@app/types';
import DataService from './data.service';
import NetworkService, { IUploadSnapshot } from './network.service';

class TransactionService extends DataService<ITransaction> {
  constructor() {
    super('transaction');
  }

  async import(
    bankAccountId: string,
    templateId: string,
    files: any[],
    onUploadProgress?: (snapshot: IUploadSnapshot) => void,
  ): Promise<ITransaction[]> {
    const url = `${Config.SERVER_URL}/${this.pluralName}/import`;

    const data = new FormData();
    data.set('bankAccountId', bankAccountId);
    data.set('templateId', templateId);

    files.forEach(x => data.set('files', x));

    const transactions = await NetworkService.post<ITransaction[]>(url, data, {
      onUploadProgress,
    });

    return transactions;
  }

  async updateCategory(category: string, transactionIds: string[]) {
    const url = `${Config.SERVER_URL}/${this.pluralName}/update-category`;
    const data = {
      category,
      transactionIds,
    };

    await NetworkService.post(url, data);
  }

  async deleteMany(ids: string[]) {
    await NetworkService.delete(`${Config.SERVER_URL}/transaction/delete`, ids);
  }

  async applyRules(ids: string[]) {
    await NetworkService.post(`${Config.SERVER_URL}/transactions/apply-rules`, ids);
  }
}

export default new TransactionService();
