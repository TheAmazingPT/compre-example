import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import pug from 'https://esm.sh/pug'

import getTemplatePath from '../../lib/get-template-path.ts';

// @desc  Serve the message list view
// @route GET /views/header
export default async function getViewMessagesList(ctx) {
  const host = 'http://localhost:3000';
  const resMessages = await fetch(`${host}/api/v1/messages`);

  const data = {
    messages: await resMessages.json()
  };
  
  const html = pug.renderFile(getTemplatePath('message-list'), {data})
  
  ctx.response.body = html;
  ctx.response.type = 'text/html';
}

if (import.meta.main) {
  const app = new Application();
  app.use(router.routes())

  const router = new Router();
  router.get('/', getViewMessagesList)

  await app.listen({port: 3333})
}


