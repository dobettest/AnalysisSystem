import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';
Vue.config.productionTip = false;
import '@/styles/index.scss'; // global css

import './icons'; //icon
import './permission'; // 路由导航守卫
import './lib/ant-design-vue';
import './lib/my-vue-ui';
//import '@/assets/font/iconfont.css';
import VueLazyLoad from 'vue-lazyload';
import worker from './webworker';
worker.postMessage('hello store')
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/default.jpg'),
  loading: require('./assets/img/default.jpg'),
  attempt: 2
});
Vue.prototype.$bus = new Vue();
export const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
