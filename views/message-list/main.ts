import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import pug from 'https://esm.sh/pug'

import getTemplatePath from '../../lib/get-template-path.ts';

// @desc  Serve the message list view
// @route GET /views/header
export default async function getViewMessageList(ctx) {
  // TODO: fetch data from API
  const data = {};
  
  const html = pug.renderFile(getTemplatePath('message-list'), {data})
  
  ctx.response.body = html;
  ctx.response.type = 'text/html';
}

if (import.meta.main) {
  const app = new Application();
  app.use(router.routes())

  const router = new Router();
  router.get('/', getViewMessageList)

  await app.listen({port: 3333})
}


