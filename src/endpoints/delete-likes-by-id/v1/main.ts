import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "../../../lib/database.ts";

export default async function deleteLikesV1(ctx: RouterContext) {
  const body = await ctx.request.body();
  const { messageId } = await body.value;

  const reactionId = `${ctx.state.userId}_${messageId}`;

  query(sql`
    UPDATE reactions
    SET like = 0
    WHERE id = ${reactionId}
  `);

  ctx.response.status = 204;
}
