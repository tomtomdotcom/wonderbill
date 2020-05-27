import * as Router from 'koa-router';
import { WonderbillApiHelper } from './ApiHelper';

export const handler: Router.IMiddleware = async (ctx): Promise<void> => {
  try {
    ctx.body = await WonderbillApiHelper.getBills('gas');
  } catch (ex) {
    ctx.status = 500;
    ctx.body = {
      error: ex.message,
    };
    return;
  }
};
