import data from '../../../data.ts';

export default async function getMessagesV1(ctx) {
  const sortedMessages = data.messages
  .map(message => {
    return {
      ...message,
      username: data.users.find(user => user.id === message.userId).name
    }
  })
  .sort((a, b) => new Date(b.time) - new Date(a.time));

  ctx.response.status = 200;
  ctx.response.body = sortedMessages;
}

