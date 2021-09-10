import userModule from './modules/user.js';
import fileModule from './modules/files.js';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        userModule,
        fileModule
    }
})