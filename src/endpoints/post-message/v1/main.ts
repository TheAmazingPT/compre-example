import {v4} from 'https://deno.land/std@0.104.0/uuid/mod.ts';

import data from '../../../../database/data.ts';

export default async function postMessageV1(ctx) {
  const body = await ctx.request.body();
  const values = await body.value.read();

  const message = {
    id: v4.generate(),
    time:new Date().toString().split(' GMT')[0],
    userId: ctx.state.user.id,
    ...values.fields
  };

  data.messages.push(message);

  ctx.response.status = 201;
  ctx.response.body = message;
}
