import * as Router from 'koa-router';
import { WonderbillApiHelper } from './ApiHelper';

export const handler: Router.IMiddleware = async (ctx): Promise<void> => {
  console.log({ KAPPA: ctx.params.type });
  if (ctx.params.type === 'gas' || ctx.params.type === 'internet') {
    try {
      ctx.body = await WonderbillApiHelper.getBills(ctx.params.type);
    } catch (ex) {
      ctx.status = 500;
      ctx.body = {
        error: ex.message,
      };
      return;
    }
  } else {
    ctx.status = 404;
    ctx.body = {
      error: 'invalid bill type',
    };
  }
};
