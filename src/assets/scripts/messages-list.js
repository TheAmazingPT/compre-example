const component = Registry.findComponentByMetaUrl(import.meta.url);
component.subscribe('MessageBox', 'update', () => component.refresh())

component.element.querySelectorAll('.message').forEach(message => {
  const messageId = message.dataset.messageId;

  message.querySelector('.message-favorite-button').addEventListener('click', async event => {
    await fetch('/api/v1/favorites', {
      method: 'POST',
      body: JSON.stringify({messageId}),
      headers: {
        'content-type': 'application/json'
      }
    })

    console.log('The Amazing PT added', messageId, 'to favorites')
  })

  message.querySelector('.message-like-button').addEventListener('click', event => {
    console.log('The Amazing PT liked', messageId)
  })
})
