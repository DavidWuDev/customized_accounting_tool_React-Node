import { isConditionMatch } from '@app/helpers/condition-match.helper';
import { BankAccount, ITransactionModel, Rule, StatementTemplate, Transaction } from '@app/models';
import { ITransaction } from '@app/types';
import * as multer from '@koa/multer';
import * as Koa from 'koa';
import DataController from './data.controller';

const upload = multer();

class TransactionController extends DataController<ITransactionModel> {
  constructor() {
    super('transaction', Transaction, {
      delete: true,
    });

    this.routes.push({
      path: `/${this.pluralName}/import`,
      method: 'POST',
      handler: this.Import,
      middleware: upload.array('files'),
    });

    this.routes.push({
      path: `/${this.pluralName}/update-category`,
      method: 'POST',
      handler: this.UpdateCategory,
    });

    this.routes.unshift({
      path: `/${this.name}/delete`,
      method: 'DELETE',
      handler: this.DeleteMany,
    });

    this.routes.push({
      path: `/${this.name}s/apply-rules`,
      method: 'POST',
      handler: this.ApplyRules,
    });
  }

  public Import = async (ctx: Koa.Context) => {
    const data = ctx.request.body;
    const bankAccountId = data.bankAccountId;
    const templateId = data.templateId;
    const files = ctx.request.files;

    const bankAccount = await BankAccount.findById(bankAccountId);
    const statementTemplate = await StatementTemplate.findById(templateId);

    if (!bankAccount) {
      ctx.throw(400, 'Invalid bank account');
    }

    if (!statementTemplate) {
      ctx.throw(400, 'Invalid template');
    }

    const reader = new (require(`statetement-reader/${statementTemplate.code}.reader`).default)();

    const transactions: ITransaction[] = [];

    for (const file of files) {
      const records = await reader.read(file.buffer);
      Array.prototype.push.apply(transactions, records);
    }

    await Transaction.insertMany(transactions.map(x => ({
      ...x,
      bankAccount: bankAccountId,
    })));

    ctx.body = transactions;
  }

  public UpdateCategory = async (ctx: Koa.Context) => {
    const data = ctx.request.body;
    const category: string = data.category;
    const transactionIds: string[] = data.transactionIds;

    if (!transactionIds.length) {
      ctx.throw(400);
    }

    await Transaction.updateMany({ _id: { $in: transactionIds } }, { $set: { category } });

    ctx.body = {
      success: true,
    };
  }

  public DeleteMany = async (ctx: Koa.Context) => {
    const ids: string[] = ctx.request.body;

    await Transaction.remove({ _id: { $in: ids } });

    ctx.body = {
      success: true,
    };
  }

  public ApplyRules = async (ctx: Koa.Context) => {
    const ids: string[] = ctx.request.body;
    const rules = await Rule.find({inactive: { $ne: true }}).sort({ order: 1 });
    const transactions = await Transaction.find({ _id: { $in: ids } });

    for (const transaction of transactions) {
      const rule = rules.find(x => isConditionMatch(transaction, x.condition));

      if (!rule) {
        continue;
      }

      if (rule.actionType === 'update_record') {
        await Transaction.update({ _id: transaction._id }, { $set: rule.payload });
      }
    }

    ctx.body = {
      success: true,
    };
  }
}

export default new TransactionController();
