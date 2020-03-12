import { IController, IControllerRoute, IData } from '@app/types';
import * as Koa from 'koa';
import * as Mongoose from 'mongoose';

interface IOptions {
  index?: boolean;
  count?: boolean;
  get?: boolean;
  post?: boolean;
  delete?: boolean;
  pluralName?: string;
}

const defaultOptions: IOptions = {
  index: true,
  count: true,
  get: true,
  post: true,
  delete: false,
  pluralName: null,
};

class DataController<T extends Mongoose.Document> implements IController {
  public routes: IControllerRoute[] = [];
  protected model: Mongoose.Model<T>;
  protected options: IOptions;
  protected name: string;
  protected pluralName: string;

  constructor(name: string, model: Mongoose.Model<T>, options?: IOptions) {
    this.model = model;
    this.name = name;
    this.options = { ...defaultOptions, ...options };
    this.pluralName = this.options.pluralName || name + 's';
    this.options.pluralName = this.pluralName;
    this.routes.push({ method: 'GET', path: `/${this.pluralName}/count`, handler: this.Count });
    this.routes.push({ method: 'GET', path: `/${this.pluralName}/lookup`, handler: this.Lookup });
    this.routes.push({ method: 'GET', path: `/${this.pluralName}`, handler: this.Index });
    this.routes.push({ method: 'GET', path: `/${name}/:id`, handler: this.Get });
    this.routes.push({ method: 'POST', path: `/${name}/:id`, handler: this.Post });
    this.routes.push({ method: 'POST', path: `/${name}`, handler: this.Post });
    this.routes.push({ method: 'DELETE', path: `/${name}/:id`, handler: this.Delete });
  }

  public Index = async (ctx: Koa.Context) => {
    if (!this.options.index) {
      ctx.throw(404);
    }

    const populate = ctx.query.populate;
    const filter = ctx.query.query ? JSON.parse(ctx.query.query) : {};
    const skip = Number(ctx.query.skip || 0);
    const limit = Number(ctx.query.limit || 0);
    const sort = ctx.query.sort;

    const query = this.model.find({});

    if (populate) {
      query.populate(populate);
    }

    query.find(filter);

    if (sort) {
      query.sort(sort);
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.limit(limit);
    }

    const data = await query;
    ctx.body = data;
  }

  public Lookup = async (ctx: Koa.Context) => {
    if (!this.options.index) {
      ctx.throw(404);
    }

    const filter = ctx.query.query ? JSON.parse(ctx.query.query) : {};
    const skip = Number(ctx.query.skip || 0);
    const limit = Number(ctx.query.limit || 0);
    const sort = ctx.query.sort;

    const query = this.model.find({});

    query.find(filter);

    if (sort) {
      query.sort(sort);
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.limit(limit);
    }

    const data = await query;
    ctx.body = data.map(x => ({
      _id: x._id,
      name: (x as any).name,
    }));
  }

  public Count = async (ctx: Koa.Context) => {
    if (!this.options.index) {
      ctx.throw(404);
    }

    const filter = ctx.query.query ? JSON.parse(ctx.query.query) : {};

    const query = this.model.find(filter);

    const count = await query.countDocuments();
    ctx.body = {
      count,
    };
  }

  public Get = async (ctx: Koa.Context) => {
    if (!this.options.get) {
      ctx.throw(404);
    }

    const id = ctx.params.id;
    const populate = ctx.query.populate;

    const query = this.model.findById(id);

    if (populate) {
      query.populate(populate);
    }

    const record = await query;

    if (!record) {
      ctx.throw(404, 'Record not found');
    }

    ctx.body = record;
  }

  public Post = async (ctx: Koa.Context) => {
    if (!this.options.post) {
      ctx.throw(404);
    }

    const id = ctx.params.id;
    const reqBody: T = ctx.request.body;

    if ((id || reqBody._id) && id !== reqBody._id) {
      ctx.throw(404);
    }

    if (id) {
      const record = await this.model.findByIdAndUpdate(id, reqBody, { new: true });
      if (!record) {
        ctx.throw(404);
      }
      ctx.body = record;
    } else {
      delete reqBody._id; // _id property should not include for new record
      const record = new this.model(reqBody);
      await record.save();
      ctx.body = record;
    }
  }

  public Delete = async (ctx: Koa.Context) => {
    if (!this.options.delete) {
      ctx.throw(404);
    }

    const id = ctx.params.id;

    const record = await this.model.findById(id);

    if (!record) {
      ctx.throw(404);
    }

    await record.remove();

    ctx.body = {
      success: true,
    };
  }
}

export default DataController;
