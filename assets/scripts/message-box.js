const component = Registry.findComponentByMetaUrl(import.meta.url);

const form = component.element.querySelector('form')
const textarea = component.element.querySelector('textarea')

form.addEventListener('submit', async event => {
  event.preventDefault();

  textarea.setAttribute('disabled', true)
  textarea.parentNode.classList.add('is-loading')

  await fetch('/api/v1/messages', {
    method: 'POST',
    body: new FormData(event.target)
  })

  component.publish('update', {test: new Date().toISOString().split('T')[1]})
})
