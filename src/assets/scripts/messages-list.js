const component = Registry.findComponentByMetaUrl(import.meta.url);
component.subscribe('MessageBox', 'update', () => component.refresh())

component.element.querySelectorAll('.message').forEach(message => {
  const messageId = message.dataset.messageId;

  const likeButton = message.querySelector('.message-like-button');
  const favoriteButton = message.querySelector('.message-favorite-button');

  likeButton.addEventListener('click', async event => {
    const method = likeButton.classList.contains('active') ? 'DELETE' : 'POST';

    await fetch('/api/v1/likes', {
      method,
      body: JSON.stringify({messageId}),
      headers: {
        'content-type': 'application/json'
      }
    })

    component.publish('update_message_like')
    component.refresh();
  })

  favoriteButton.addEventListener('click', async event => {
    const method = favoriteButton.classList.contains('active') ? 'DELETE' : 'POST';

    await fetch('/api/v1/favorites', {
      method,
      body: JSON.stringify({messageId}),
      headers: {
        'content-type': 'application/json'
      }
    })

    component.publish('update_message_favorite')
    component.refresh();
  })
})
