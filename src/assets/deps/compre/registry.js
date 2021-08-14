import Component from './component.js';

export default class Registry {
  constructor() {
    this.components = {};
    this.subscriptions = {};

    this.scan();
  }

  scan() {
    Array.from(document.querySelectorAll('.component'))
      .forEach(element => this.register(element));
  }

  register(element) {
    console.info('REGISTER', element.id)

    const component = new Component(element, this)
    
    if (this.components[component.id]) {
      return console.log('ERROR', component.id, 'already exists!')
    }

    this.components[component.id] = component;

    return component;
  }

  unregister(component) {
    console.info('UNREGISTER', component.id)
    delete this.components[component.id];
  }

  replaceComponent(component, html) {
    this.unregister(component);

    if (html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const newComponent = component.element.insertAdjacentElement('beforebegin', div.firstChild)

      div.remove();

      this.register(newComponent);
    }

    component.element.remove();
    component = null;
  }

  findComponentByMetaUrl(url) {
    const componentId = new URL(url).searchParams.get('component_id');
    return this.components[componentId];
  }

  setupSubscription(componentId, action) {
    if (componentId && !this.subscriptions[componentId]) {
      this.subscriptions[componentId] = {};
    }

    if (componentId && action && !this.subscriptions[componentId][action]) {
      this.subscriptions[componentId][action] = {};
    }
  }

  subscribe(subscriberId, componentId, action, callback) {
    console.info('SUBSCRIBE', componentId, action)
    this.setupSubscription(componentId, action);
    this.subscriptions[componentId][action][subscriberId] = callback;
  }

  unsubscribe(subscriberId, componentId, action) {
    console.info('UNSUBSCRIBE', componentId, action)
    delete this.subscriptions[componentId][action][subscriberId];
  }

  publish(componentId, action, data) {
    console.info('PUBLISH', componentId, action, data)
    this.setupSubscription(componentId, action);
    Object.values(this.subscriptions[componentId][action]).forEach(subscriber => subscriber(data));
  }
}
