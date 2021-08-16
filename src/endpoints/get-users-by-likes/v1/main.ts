import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "../../../lib/database.ts";

export default function getUsersByLikesV1(ctx: RouterContext) {
  const messageId = ctx.request.params.messageId;

  const messages = query(sql`
    SELECT
      users.id,
      users.handle,
      users.email,
      users.fullname
    FROM reactions
    JOIN users ON reactions.userId = users.id
    WHERE "messageId" = ${messageId} AND "like" = 1                         
    ORDER BY messages.createdAt DESC
  `);

  ctx.response.status = 200;
  ctx.response.body = messages;
}
