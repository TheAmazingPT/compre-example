import { Application, Router, RouterContext } from "https://deno.land/x/oak";
import pug from "pug";

import getTemplatePath from "lib/get-template-path.ts";

// @desc  Serve the header view
// @route GET /views/header
export default function getViewHeader(ctx: RouterContext) {
  const data = {};
  const html = pug.renderFile(getTemplatePath("header"), { data });

  ctx.response.body = html;
  ctx.response.type = "text/html";
}

if (import.meta.main) {
  const router = new Router();
  router.get("/", getViewHeader);

  const app = new Application();
  app.use(router.routes());

  await app.listen({ port: 3333 });
}
