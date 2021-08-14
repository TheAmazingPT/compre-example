import data from '../../../data.ts';

export default async function getFavoritesByIdV1(ctx) {
  const userId = ctx.state.user.id;

  const favorites = data.favorites
    .filter(favorite => favorite.userId === userId)
    .map(favorite => favorite.messageId)

  const messages = data.messages
    .filter(message => favorites.includes(message.id))
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  ctx.response.status = 200;
  ctx.response.body = messages;
}

