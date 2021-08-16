import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "../../../lib/database.ts";

export default async function postMessageV1(ctx: RouterContext) {
  const body = await ctx.request.body();
  const values = await body.value.read();
  const uuid = crypto.randomUUID();

  const messages = query(sql`
    INSERT INTO messages (
      "id",
      "createdBy",
      "text"
    )
    VALUES (
      ${uuid},
      ${ctx.state.userId},
      ${values.fields.message}
    )
    RETURNING *
  `);

  ctx.response.status = 201;
  ctx.response.body = messages[0];
}
