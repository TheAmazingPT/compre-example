import { RouterContext } from "oak";
import sql from "https://esm.sh/sql-template-tag";

import { query } from "../../../lib/database.ts";

export default function getMessagesV1(ctx: RouterContext) {
  const userId = ctx.state.userId;

  const messages = query(sql`
    SELECT
      messages.id,
      users.handle,
      users.fullname,
      messages.createdAt,
      messages.text,
      SUM(CASE WHEN reactions.like = 1 THEN 1 ELSE 0 END) as likes,
      SUM(CASE
        WHEN true
          AND reactions.userId = ${userId}
          AND reactions.favorite = 1
        THEN 1 ELSE 0 END
      ) as isFavorite,
      SUM(CASE
        WHEN true
          AND reactions.userId = ${userId}
          AND reactions.like = 1
        THEN 1 ELSE 0 END
      ) as isLike      
    FROM messages
    JOIN users ON messages.createdBy = users.id
    LEFT JOIN reactions ON reactions.messageId = messages.id
    GROUP BY messages.id
    ORDER BY messages.createdAt DESC                         
  `);

  const sortedMessages = messages
    .sort((
      a: Partial<{ time: string }>,
      b: Partial<{ time: string }>,
    ): number => new Date(b.time) - new Date(a.time));

  ctx.response.status = 200;
  ctx.response.body = sortedMessages;
}
