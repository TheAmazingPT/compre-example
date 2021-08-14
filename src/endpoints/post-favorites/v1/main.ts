import data from '../../../data.ts';

export default async function postFavoritesV1(ctx) {
  const body = await ctx.request.body();
  const {messageId} = await body.value;

  data.favorites.push({userId: ctx.state.user.id, messageId});

  ctx.response.status = 201;
}

