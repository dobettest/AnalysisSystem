import chart from './src/index.vue';
chart.install = function(Vue) {
  Vue.component('chart', chart);
};
export default chart;
