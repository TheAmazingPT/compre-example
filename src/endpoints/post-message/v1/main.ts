import {v4} from 'https://deno.land/std@0.104.0/uuid/mod.ts';
import sql from 'https://esm.sh/sql-template-tag';

import {query} from '../../../lib/database.ts';

export default async function postMessageV1(ctx) {
  const body = await ctx.request.body();
  const values = await body.value.read();

  const messages = query(sql`
    INSERT INTO messages (
      "id",
      "createdBy",
      "text"
    )
    VALUES (
      ${v4.generate()},
      ${ctx.state.userId},
      ${values.fields.message}
    )
    RETURNING *
  `)

  ctx.response.status = 201;
  ctx.response.body = messages[0];
}
