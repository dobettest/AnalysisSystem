import Vue from 'vue';
import loadingComponent from './index.vue';

const loadingConstructor = Vue.extend(loadingComponent);

const instance = new loadingConstructor({
  el: document.createElement('div')
});
instance.show = false;
const config = {
  text: '正在加载中...',
  textColor: '#000',
  background: 'rgba(0,0,0,0)',
  spin: 'rect'
};
const loading = {
  show(options) {
    instance.show = true;
    let el = document.body;
    if (options) {
      for (let key in options) {
        if (key === 'getContainer') {
          el = options['getContainer']();
          continue;
        }
        instance[key] = options[key];
      }
    }
    el.appendChild(instance.$el);
  },
  hide() {
    instance.show = false;
  }
};

export default {
  install(Vue, opt = {}) {
    Object.keys(opt).forEach(key => {
      config[key] = opt[key];
    })
    for (let key in config) {
      if (key === 'getContainer') {
        continue;
      }
      instance[key] = config[key];
    }
    if (!Vue.$loading) {
      Vue.prototype.$loading = loading;
    }
  }
};
