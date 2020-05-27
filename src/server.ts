import Koa from 'koa';
import Router from 'koa-router';
import * as bills from './endpoints/bills';

function registerRoutes(router: Router) {
  router.get('/bills', bills.handler);
}

export default async function createServer(): Promise<Koa> {
  const router = new Router();
  registerRoutes(router);
  const app = new Koa();

  app.use(router.routes()).use(router.allowedMethods());

  return Promise.resolve(app);
}
