import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import bus from './bus';
import "default-passive-events"; //添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题
Vue.config.productionTip = false;

import 'normalize.css/normalize.css'; //css resets
import '@/styles/index.scss'; // global css

import './icons'; //icon

import './permission'; // 路由导航守卫

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import scrollBar from '@/components/scrollBar';
import card from '@/components/card';
import '@/components/scrollBar/index.scss';
Vue.component('scroll-bar', scrollBar);
Vue.component('chart-panel', card);
import { mockXHR } from '../mock';
if (process.env.NODE_ENV === 'production') {
  mockXHR();
}

import loading from '@/components/loading/loading'; // 引入loading
Vue.use(loading); // 全局使用loading

import chart from '@/components/echart';

Vue.use(chart);
Vue.prototype.$bus = bus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
