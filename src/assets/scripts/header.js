const component = Registry.findComponentByMetaUrl(import.meta.url);

// Maybe something like this is nicer to use?
// window.Registry.subscribe('MessageBox')
//   .on('update', updateDataUrl)
//   .on('remove', somethingElse)
//
// component.subscribe('MessageBox', 'update', () => component.refresh())
