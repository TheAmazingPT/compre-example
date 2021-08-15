import sql from 'https://esm.sh/sql-template-tag';
import {query} from '../../../lib/database.ts';

export default async function deleteLikesV1(ctx) {
  const body = await ctx.request.body();
  const {messageId} = await body.value;

  const id = `${ctx.state.userId}_${messageId}`;

  const res = query(sql`
    UPDATE reactions
    SET like = 0
    WHERE id = ${id}
  `)

  ctx.response.status = 204;
}

