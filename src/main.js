import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';

Vue.config.productionTip = false;
import 'normalize.css/normalize.css'; //css resets
import '@/styles/index.scss'; // global css

import './icons'; //icon
import './permission'; // 路由导航守卫
import './lib/ant-design-vue';
import './lib/tim';//引入及时通讯
import './lib/trtc';//引入实时音视频

import scrollBar from '@/components/scrollBar';
import '@/components/scrollBar/index.scss';
Vue.component('scroll-bar', scrollBar);

/*import { mockXHR } from '../mock';
if (process.env.NODE_ENV === 'production') {
  mockXHR();
}*/

import loading from '@/components/loading/loading'; // 引入loading

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/v-error.png'),
  loading: require('./assets/img/v-loading.gif'),
  attempt: 2
})
Vue.use(loading); // 全局使用loading
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
