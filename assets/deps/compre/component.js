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

  initScript(componentId) {
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

  async refresh() {
    const res = await fetch(this.element.dataset.url);
    const html = await res.text();

    this.destroy();
    this.registry.replaceComponent(this, html);

    // this.element.insertAdjacentHTML('beforebegin', html);
  }
}
