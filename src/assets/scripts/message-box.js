const component = Registry.findComponentByMetaUrl(import.meta.url);

const form = component.element.querySelector('form')
const textarea = component.element.querySelector('textarea')
const counter = document.getElementById('MessageBoxCounter')

textarea.addEventListener('input', event => {
  counter.textContent = `${event.target.value.length}/300`;
})

form.addEventListener('submit', async event => {
  event.preventDefault();

  await fetch('/api/v1/messages', {
    method: 'POST',
    body: new FormData(form)
  })

  textarea.setAttribute('disabled', true)
  textarea.parentNode.classList.add('is-loading')

  component.publish('update', {test: new Date().toISOString().split('T')[1]})
  component.refresh();
})
