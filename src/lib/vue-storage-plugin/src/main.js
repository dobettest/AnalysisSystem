import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import './lib/icon.js'
import './lib/ant-design-vue.js';
import 'ant-design-vue/dist/antd.css';
//import './style/index.scss';
new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")