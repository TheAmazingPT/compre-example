import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import pug from 'https://esm.sh/pug'

import getTemplatePath from '../../lib/get-template-path.ts';

// @desc  Serve the header view
// @route GET /views/header
export default async function getViewHeader(ctx) {
  // TODO: fetch data from API
  const data = {
    search: ctx.request.url.search,
    test: ctx.request.url.searchParams.get('test')
  };
  
  const html = pug.renderFile(getTemplatePath('header'), {data})
  
  ctx.response.body = html;
  ctx.response.type = 'text/html';
}

if (import.meta.main) {
  const app = new Application();
  app.use(router.routes())

  const router = new Router();
  router.get('/', getViewHeader)

  await app.listen({port: 3333})
}


