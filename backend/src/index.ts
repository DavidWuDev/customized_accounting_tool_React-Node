import * as cors from '@koa/cors';
import * as multer from '@koa/multer';
import * as Config from 'config';
import * as Debug from 'debug';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Mount from 'koa-mount';
import * as Mongoose from 'mongoose';

import './polyfill';

const debug = Debug('app:server');
const error = Debug('app:error');

import api from './api/1.0';
import { ErrorHandler, NotFoundHandler, PortalServe } from './middleware';

/* tslint:disable-next-line */
error.log = console.info.bind(console);

const server = (async () => {
  try {
    debug(`Connecting to db "${Config.get('db')}"`);
    await Mongoose.connect(Config.get('db'), { useNewUrlParser: true });
    debug(`Server connected to db "${Config.get('db')}"`);

    const app = new Koa();

    // Enable cors
    app.use(cors());
    app.use(bodyParser());

    // Handle exception
    app.use(ErrorHandler);

    app.use(Mount('/api/1.0', api));

    if (process.env.NODE_ENV === 'production') {
      app.use(PortalServe(__dirname + '/../../portal/build'));
    }

    // Request url not found
    app.use(NotFoundHandler);

    const port = process.env.PORT || Config.get('port');

    app.listen(port);
    debug(`Server running on port ${port}`);
  } catch (e) {
    error(`Server startup failed: ${e.message}`);
  }
})();

export default server;
