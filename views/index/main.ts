import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import pug from 'https://esm.sh/pug'

import getTemplatePath from '../../lib/get-template-path.ts';

// @desc  Serve the index file for root path
// @route GET /
export default async function getViewIndex(ctx) {
  const host = 'http://localhost:3000';
  const resMessages = await fetch(`${host}/api/v1/messages`);
  const resFavorites = await fetch(`${host}/api/v1/favorites`);

  const data = {
    messages: await resMessages.json(),
    favorites: await resFavorites.json()
  };
  
  const html = pug.renderFile(getTemplatePath('index'), {data})
  
  ctx.response.body = html;
  ctx.response.type = 'text/html';
}

if (import.meta.main) {
  const app = new Application();
  app.use(router.routes())

  const router = new Router();
  router.get('/', getViewIndex)

  await app.listen({port: 3333})
}


