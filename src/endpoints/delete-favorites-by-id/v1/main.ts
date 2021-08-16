import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "lib/database.ts";

export default async function deleteFavoritesByIdV1(ctx: RouterContext) {
  const body = await ctx.request.body();
  const messageId: string = await body.value.messageId;

  const id = `${ctx.state.userId}_${messageId}`;

  try {
    query(sql`
      UPDATE reactions
      SET favorite = 0
      WHERE id = ${id}
    `);

    ctx.response.status = 204;
  } catch (error) {
    ctx.response.status = 500;

    if (Deno.env.get("DENO_ENV") !== "production") {
      ctx.body = JSON.stringify(error);
    }
  }
}
