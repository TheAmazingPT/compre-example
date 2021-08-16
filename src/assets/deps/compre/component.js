export default class Component {
  constructor(element, registry) {
    this.id = element.id;
    this.element = element;
    this.registry = registry;

    this.initScript();
    
    return this;
  }

  subscribe(componentId, action, callback) {
    this.registry.subscribe(this.id, componentId, action, callback);
  }

  unsubscribe(componentId, action) {
    this.registry.unsubscribe(this.id, componentId, action);
  }

  unsubscribeAll() {
    Object.values(this.registry.subscriptions)
      .forEach(component => Object.values(component)
        .forEach(action => action[this.id] && delete action[this.id]))
  }

  publish(action, data) {
    this.registry.publish(this.id, action, data);
  }

  destroy() {
    this.unsubscribeAll();
    this.script.remove();
  }

  // TODO: experiment with Shadow DOM, where a script can be automatically be
  // executed.
  initScript() {
    if (!this.element.dataset.scripturl) {
      return;
    }

    const cachebuster = new Date().getTime();
    const url = `${this.element.dataset.scripturl}?component_id=${this.id}#${cachebuster}`
    const newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('defer', '');
    newScriptTag.setAttribute('type', 'module');
    newScriptTag.setAttribute('src', url);
    

    this.script = document.head.appendChild(newScriptTag);
  }

  // html could be the result of a fetch request
  async refresh(html = '') {
    if (!html) {
      const res = await fetch(this.element.dataset.url);
      html = await res.text();
    }

    this.destroy();
    this.registry.replaceComponent(this, html);
  }
}
