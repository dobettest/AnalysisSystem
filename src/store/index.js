import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const state = {
  needNotice: true,
  notice: false
}
const mutations = {
  setNeedNotice(state, needNotice) {
    state.needNotice = needNotice;
  },
  setNotice(state, notice) {
    state.notice = notice;
  }
}
const actions = {
  notice({ commit }, payload) {
    let { icon, title, body } = typeof payload === 'Object' ? payload : { icon: 'https://webim-1252463788.file.myqcloud.com/demo/img/logo.dc3be0d4.png', title: "新消息通知", body: "你有一条消息待处理" }
    return new Promise((resolve, reject) => {
      if ("Notification" in window) {
        if (window.Notification.permission !== "denied") {
          var notification = new window.Notification(title, {
            icon,
            body,
            vibrate: [200, 100, 200],
          })
          notification.onclick = function (event) {
            // event.preventDefault();
            window.focus();
          };
          notification.onerror = function (err) {
            console.log("err", err);
            reject();
          };
          notification.onshow = function () {
            resolve()
          }
        }
      }
    })
  },
  async setNeedNotice({ commit }, state) {
    await commit('setNeedNotice', state);
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
});
export default store;
