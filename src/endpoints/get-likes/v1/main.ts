import sql from 'https://esm.sh/sql-template-tag';
import {query} from '../../../lib/database.ts';

export default async function getLikesV1(ctx) {
  const userId = ctx.state.userId;

  const messages = query(sql`
    SELECT
      messages.id,
      users.handle,
      users.fullname,
      messages.createdAt,
      messages.text
    FROM reactions
    JOIN messages ON reactions.messageId = messages.id
    JOIN users ON reactions.userId = users.id
    WHERE "userId" = ${ctx.state.userId} AND "like" = 1                         
    ORDER BY messages.createdAt DESC
  `)

  ctx.response.status = 200;
  ctx.response.body = messages;
}

