import screenfull from './src/index.vue';
import Vue from 'vue';
screenfull.install = function (Vue) {
    Vue.component(screenfull.name, screenfull)
}
var api={
    test(){
        alert("test")
    }
}
Vue.prototype.$screenfull = api;
export default screenfull;