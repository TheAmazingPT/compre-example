import sql from 'https://esm.sh/sql-template-tag';
import {query} from '../../../lib/database.ts';

export default async function getMessagesV1(ctx) {
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
          AND reactions.userId = ${ctx.state.userId}
          AND reactions.favorite = 1
        THEN 1 ELSE 0 END
      ) as isFavorite,
      SUM(CASE
        WHEN true
          AND reactions.userId = ${ctx.state.userId}
          AND reactions.like = 1
        THEN 1 ELSE 0 END
      ) as isLike      
    FROM messages
    JOIN users ON messages.createdBy = users.id
    JOIN reactions ON reactions.messageId = messages.id
    GROUP BY messages.id
    ORDER BY messages.createdAt DESC                         
  `)

  const sortedMessages = messages
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  ctx.response.status = 200;
  ctx.response.body = sortedMessages;
}

