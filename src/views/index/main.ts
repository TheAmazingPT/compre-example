import { Application, Router, RouterContext } from "https://deno.land/x/oak";
import pug from "https://esm.sh/pug";

import getTemplatePath from "../../lib/get-template-path.ts";

// @desc  Serve the index file for root path
// @route GET /
export default async function getViewIndex(ctx: RouterContext) {
  const host = "http://localhost:3000";
  const resMessages = await fetch(`${host}/api/v1/messages`);

  const data = {
    messages: await resMessages.json(),
  };

  const html = pug.renderFile(getTemplatePath("index"), { data });

  ctx.response.body = html;
  ctx.response.type = "text/html";
}

if (import.meta.main) {
  const router = new Router();
  router.get("/", getViewIndex);

  const app = new Application();
  app.use(router.routes());

  await app.listen({ port: 3333 });
}
