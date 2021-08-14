const component = Registry.findComponentByMetaUrl(import.meta.url);

// Maybe something like this is nicer to use?
// window.Registry.subscribe('MessageBox')
//   .on('update', updateDataUrl)
//   .on('remove', somethingElse)
component.subscribe('MessageBox', 'update', updateDataUrl)

function updateDataUrl(data) {
  const url = new URL(`${location.origin}${component.element.dataset.url}`);
  url.searchParams.set('test', data.test)

  component.element.dataset.url = url;
  component.refresh()
}
