import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "../../../lib/database.ts";

export default async function postFavoritesV1(ctx: RouterContext) {
  const body = await ctx.request.body();
  const { messageId } = await body.value;

  const id = `${ctx.state.userId}_${messageId}`;

  query(sql`
    INSERT INTO reactions (
      "id",
      "userId",
      "messageId",
      "favorite"
    )
    VALUES (
      ${id},
      ${ctx.state.userId},
      ${messageId},
      1
    )
    ON CONFLICT DO UPDATE SET favorite = 1;                         
  `);

  ctx.response.status = 201;
}
