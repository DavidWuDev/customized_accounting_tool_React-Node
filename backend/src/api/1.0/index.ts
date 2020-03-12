import { IController } from '@app/types';
import * as Compose from 'koa-compose';
import * as Router from 'koa-router';
import authMiddleware from '../../middleware/auth.middleware';
import AuthController from './controllers/auth.controller';
import BankAccountController from './controllers/bank-account.controller';
import BankController from './controllers/bank.controller';
import CategoryController from './controllers/category.controller';
import PersonController from './controllers/person.controller';
import ReportController from './controllers/report.controller';
import RuleController from './controllers/rule.controller';
import StatementTemplateController from './controllers/statement-template.controller';
import TransactionController from './controllers/transaction.controller';

const publicRouter = new Router();
const privateRouter = new Router();

privateRouter.use(authMiddleware);

publicRouter.get('/alive', async (ctx) => {
  ctx.body = {
    status: 'ok',
    timestamp: Date.now(),
  };
});

publicRouter.get('/info', async (ctx) => {
  ctx.body = {
    status: 'ok',
    timestamp: Date.now(),
    version: require('../../../package.json').version,
  };
});

const setControllerRoutes = (router: Router, controller: IController) => {
  controller.routes.forEach(x => {
    let routeRegisterHandler: any = null;
    switch (x.method) {
      case 'GET':
        routeRegisterHandler = router.get;
        break;
      case 'POST':
        routeRegisterHandler = router.post;
        break;
      case 'DELETE':
        routeRegisterHandler = router.delete;
        break;
    }

    if (routeRegisterHandler) {
      if (x.middleware) {
        routeRegisterHandler.call(router, x.path, x.middleware, x.handler);
      } else {
        routeRegisterHandler.call(router, x.path, x.handler);
      }
    }
  });
};

setControllerRoutes(publicRouter, AuthController);

setControllerRoutes(privateRouter, BankAccountController);
setControllerRoutes(privateRouter, BankController);
setControllerRoutes(privateRouter, PersonController);
setControllerRoutes(privateRouter, TransactionController);
setControllerRoutes(privateRouter, StatementTemplateController);
setControllerRoutes(privateRouter, CategoryController);
setControllerRoutes(privateRouter, ReportController);
setControllerRoutes(privateRouter, RuleController);

export default Compose([
  publicRouter.routes(),
  publicRouter.allowedMethods(),
  privateRouter.routes(),
  privateRouter.allowedMethods(),
]);
