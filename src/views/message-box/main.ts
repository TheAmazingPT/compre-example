import { Application, Router, RouterContext } from "https://deno.land/x/oak";
import pug from "https://esm.sh/pug";

import getTemplatePath from "../../lib/get-template-path.ts";

// @desc  Serve the header view
// @route GET /views/header
export default function getViewMessageBox(ctx: RouterContext) {
  const html = pug.renderFile(getTemplatePath("message-box"));

  ctx.response.body = html;
  ctx.response.type = "text/html";
}

if (import.meta.main) {
  const router = new Router();
  router.get("/", getViewMessageBox);

  const app = new Application();
  app.use(router.routes());

  await app.listen({ port: 3333 });
}
