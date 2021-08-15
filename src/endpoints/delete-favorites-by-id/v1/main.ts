import sql from 'https://esm.sh/sql-template-tag';
import {query} from '../../../lib/database.ts';

export default async function deleteFavoritesByIdV1(ctx) {
  const body = await ctx.request.body();
  const {messageId} = await body.value;

  const id = `${ctx.state.userId}_${messageId}`;

  const res = query(sql`
    UPDATE reactions
    SET favorite = 0
    WHERE id = ${id}
  `)

  ctx.response.status = 204;
}

