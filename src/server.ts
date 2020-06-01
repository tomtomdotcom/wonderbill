import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import * as bills from './endpoints/bills';

function registerRoutes(router: Router) {
  router.get('/bills/:type', bills.handler);
  router.get('/health', () => console.log('Up!'));
}

export default async function createServer(): Promise<Koa> {
  const app = new Koa();
  const router = new Router();
  registerRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
  app.use(logger());

  return Promise.resolve(app);
}
