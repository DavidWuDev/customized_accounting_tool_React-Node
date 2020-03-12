import { BankAccount, Person, Transaction } from '@app/models';
import { IController, IControllerRoute } from '@app/types';
import * as Koa from 'koa';
import * as Moment from 'moment';
import * as Mongoose from 'mongoose';

const TIMEZONE = '+05:30';

const currentFiscalYear = () => {
  return Moment().month() < 3 ? Moment().year() - 1 : Moment().year();
};

class ReportController implements IController {
  public routes: IControllerRoute[] = [];

  constructor() {
    const basepath = '/reports';
    this.routes.push({ method: 'GET', path: `${basepath}/income-expense`, handler: this.IncomeExpense });
    this.routes.push({ method: 'GET', path: `${basepath}/balance`, handler: this.Balance });
    this.routes.push({ method: 'GET', path: `${basepath}/income-category`, handler: this.IncomeCateogry });
    this.routes.push({ method: 'GET', path: `${basepath}/expense-category`, handler: this.ExpenseCateogry });
    this.routes.push({ method: 'GET', path: `${basepath}/income-tax`, handler: this.IncomeTax });
    this.routes.push({ method: 'GET', path: `${basepath}/data-statistics`, handler: this.DataStatistics });
  }

  public IncomeExpense = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const from: string = ctx.request.query.from;
    const to: string = ctx.request.query.to;

    const filters = [];

    if (person) {
      filters.push({
        $lookup: {
          from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount',
        },
      });
      filters.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    if (from) {
      filters.push({
        $match: { transactionDate: { $gte: new Date(from) } },
      });
    }

    if (to) {
      filters.push({
        $match: { transactionDate: { $lte: new Date(to) } },
      });
    }

    const result = await Transaction.aggregate([
      ...filters,
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
      { $unwind: { path: '$category' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$transactionDate', timezone: TIMEZONE } },
          income: {
            $sum: {
              $cond: {
                if: { $in: ['$category.nature', ['DI']] },
                then: '$amount',
                else: 0,
              },
            },
          },
          expense: {
            $sum: {
              $cond: {
                if: { $in: ['$category.nature', ['DE', 'IE']] },
                then: '$amount',
                else: 0,
              },
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    ctx.body = result;
  }

  public Balance = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const from: string = ctx.request.query.from;
    const to: string = ctx.request.query.to;

    const filter = [];

    if (person) {
      filter.push({
        $lookup: {
          from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount',
        },
      });
      filter.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    if (from) {
      filter.push({
        $match: { transactionDate: { $gte: new Date(from) } },
      });
    }

    if (to) {
      filter.push({
        $match: { transactionDate: { $lte: new Date(to) } },
      });
    }

    const result = await Transaction.aggregate([
      ...filter,
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$transactionDate', timezone: '+05:30' } },
          amount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    let openingBalance = 0;

    if (from) {
      const openingTransactionBalanceResult = await Transaction.aggregate([
        { $match: { transactionDate: { $lt: new Date(from) } } },
        {
          $group: {
            _id: null,
            amount: { $sum: '$amount' },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      openingBalance += openingTransactionBalanceResult.length ? openingTransactionBalanceResult[0].amount : 0;
    }

    const personFilterBankBalance = [];
    if (person) {
      personFilterBankBalance.push({ $match: { accountHolder: Mongoose.Types.ObjectId(person) } });
    }

    const openingBankBalanceResult = await BankAccount.aggregate([
      ...personFilterBankBalance,
      {
        $group: {
          _id: null,
          amount: { $sum: '$openingBalance' },
        },
      },
    ]);

    openingBalance += openingBankBalanceResult.length ? openingBankBalanceResult[0].amount : 0;
    result.reduce((previousValue, currentValue) => {
      currentValue.balance = (currentValue.amount + previousValue);
      return currentValue.balance;
    }, openingBalance);

    const data: any = {};
    result.forEach(x => {
      const month = Moment(x._id).format('YYYY-MM');
      if (!data[month]) {
        data[month] = {
          _id: month,
          min: x.balance,
          max: x.balance,
        };
      } else {
        if (data[month].min > x.balance) {
          data[month].min = x.balance;
        }
        if (data[month].max < x.balance) {
          data[month].max = x.balance;
        }
      }
    });

    ctx.body = Object.keys(data).map(x => data[x]);
  }

  public IncomeCateogry = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const from: string = ctx.request.query.from;
    const to: string = ctx.request.query.to;

    const filters = [];

    if (person) {
      filters.push({
        $lookup: {
          from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount',
        },
      });
      filters.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    if (from) {
      filters.push({
        $match: { transactionDate: { $gte: new Date(from) } },
      });
    }

    if (to) {
      filters.push({
        $match: { transactionDate: { $lte: new Date(to) } },
      });
    }

    const result = await Transaction.aggregate([
      ...filters,
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
      { $unwind: { path: '$category' } },
      { $match: { 'category.nature': { $in: ['DI', 'II'] } } },
      {
        $group: {
          _id: '$category.name',
          income: {
            $sum: '$amount',
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    ctx.body = result;
  }

  public ExpenseCateogry = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const from: string = ctx.request.query.from;
    const to: string = ctx.request.query.to;

    const filters = [];

    if (person) {
      filters.push({
        $lookup: {
          from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount',
        },
      });
      filters.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    if (from) {
      filters.push({
        $match: { transactionDate: { $gte: new Date(from) } },
      });
    }

    if (to) {
      filters.push({
        $match: { transactionDate: { $lte: new Date(to) } },
      });
    }

    const result = await Transaction.aggregate([
      ...filters,
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
      { $unwind: { path: '$category' } },
      { $match: { 'category.nature': { $in: ['DE', 'IE'] } } },
      {
        $group: {
          _id: '$category.name',
          expense: {
            $sum: '$amount',
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    ctx.body = result;
  }

  public IncomeTax = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const fiscalYear: number = Number(ctx.request.query.fiscalYear || currentFiscalYear());

    const from = new Date(fiscalYear, 3, 1);
    const to = new Date(fiscalYear + 1, 2, 31, 23, 59, 59, 999);

    const filters = [];

    if (person) {
      filters.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    const result = await Transaction.aggregate([
      { $lookup: { from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount' } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
      { $unwind: { path: '$bankAccount' } },
      { $unwind: { path: '$category' } },
      ...filters,
      {
        $match: {
          $and: [
            { transactionDate: { $gte: new Date(from) } },
            { transactionDate: { $lte: new Date(to) } },
          ],
        },
      },
      {
        $group: {
          _id: '$bankAccount.accountHolder',
          income: {
            $sum: {
              $cond: {
                if: { $in: ['$category.nature', ['DI', 'II']] },
                then: '$amount',
                else: 0,
              },
            },
          },
          lastTransactionData: {
            $max: '$transactionDate',
          },
        },
      },
      { $lookup: { from: 'persons', localField: '_id', foreignField: '_id', as: 'person' } },
      { $unwind: { path: '$person' } },
      { $sort: { _id: 1 } },
    ]);

    result.forEach(x => {
      const remainingMonths = 12 - (Moment(x.lastTransactionData).month() + 9) % 12 + 1;
      const futureIncome = remainingMonths * (x.person.monthlyIncome || 0);
      const totalIncome = x.income + futureIncome;

      const totalExemptionAmount = totalIncome * 0.45;
      const totalTaxableAmount = totalIncome * 0.55;

      const taxDetail = [{
        category: '<2,50,000',
        taxRate: 0,
        taxableAmount: Math.min(totalTaxableAmount, 250000),
        tax: 0,
      }, {
        category: '2,50,001 - 5,00,000',
        taxRate: 0.05,
        taxableAmount: Math.max(Math.min(totalTaxableAmount, 500000) - 250000, 0),
        tax: 0,
      }, {
        category: '5,00,001 - 10,00,000',
        taxRate: 0.2,
        taxableAmount: Math.max(Math.min(totalTaxableAmount, 1000000) - 500000, 0),
        tax: 0,
      }, {
        category: '>10,00,000',
        taxRate: 0.3,
        taxableAmount: Math.max(totalTaxableAmount - 1000000, 0),
        tax: 0,
      }];

      taxDetail.forEach(t => {
        t.tax = t.taxableAmount * t.taxRate;
      });

      const totalTax = taxDetail.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.tax;
      }, 0);

      x.futureIncome = futureIncome;
      x.totalIncome = totalIncome;
      x.totalTaxableAmount = totalTaxableAmount;
      x.totalExemptionAmount = totalExemptionAmount;
      x.taxDetail = taxDetail;
      x.totalTax = totalTax;
    });

    ctx.body = result;
  }

  public DataStatistics = async (ctx: Koa.Context) => {
    const person: string = ctx.request.query.person;
    const fiscalYear: number = Number(ctx.request.query.fiscalYear || currentFiscalYear());

    const from = new Date(fiscalYear, 3, 1);
    const to = new Date(fiscalYear + 1, 2, 31, 23, 59, 59, 999);

    const filters = [];

    if (person) {
      filters.push({
        $lookup: {
          from: 'bank-accounts', localField: 'bankAccount', foreignField: '_id', as: 'bankAccount',
        },
      });
      filters.push({ $match: { 'bankAccount.accountHolder': Mongoose.Types.ObjectId(person) } });
    }

    if (from) {
      filters.push({
        $match: { transactionDate: { $gte: new Date(from) } },
      });
    }

    if (to) {
      filters.push({
        $match: { transactionDate: { $lte: new Date(to) } },
      });
    }

    const emptyCategory = await Transaction.aggregate([
      ...filters,
      { $match: { category: null } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const emptyCategoryCount = emptyCategory.length ? emptyCategory[0].count : 0;

    const duplicateRecords = await Transaction.aggregate([
      ...filters,
      {
        $group: {
          _id: {
            transactionDate: '$transactionDate',
            amount: '$amount',
            bankAccount: '$bankAccount',
            narration: '$narration',
          },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $group: { _id: null, count: { $sum: '$count' } } },
    ]);

    ctx.body = {
      emptyCategory: emptyCategory.length ? emptyCategory[0].count : 0,
      duplicateRecords: duplicateRecords.length ? duplicateRecords[0].count : 0,
    };
  }
}

export default new ReportController();
