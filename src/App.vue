<!--
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 22:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-antd-admin\src\App.vue
-->
<template>
  <div id="app">
    <chart-panel v-if="isFull" :title="title" :isFull="isFull" class="full"></chart-panel>
    <router-view v-show="!isFull" />
  </div>
</template>
<script>
import Vue from 'vue';
import card from '@/components/card';
export default {
  name: 'App',
  data() {
    return {
      isFull: false,
      title: '',
      config: null
    };
  },
  mounted() {
    let chart = null;
    /*this.$nextTick(() => {
        let fragment = document.createDocumentFragment();
        let copy = document.createElement('div');
        copy.innerHTML = el.innerHTML;
        fragment.appendChild(copy);
        document.getElementById('full-container').appendChild(fragment);
      });*/
    /*this.$bus.$on('screenfy', props => {
      let { isFull } = props;
      if (isFull) {
        this.screenfull = true;
        this.$nextTick(() => {
          chart=new Vue({
            render: h => h(card, { class: ['full'], props })
          }).$mount('#full-container');
        });
      } else {
        this.screenfull = false;
        this.$nextTick(() => {
          chart.$
        });
      }
    });*/
    this.$bus.$on('screenfy', props => {
      this.config = null;
      this.$nextTick(() => {
        Object.keys(props).forEach(v => {
          this.$set(this, v, props[v]);
        });
      });
    });
  }
};
</script>
<style lang="scss">
#app {
  .wrap {
    float: left;
    width: 50%;
    height: 100%;
  }
  .full .ant-card-body {
    height: calc(100% - 60px) !important;
  }
  .full,
  .full .ant-card,
  .full .panel {
    height: 100% !important;
  }
  .full .ant-card-head {
    height: 60px;
  }
}
@media screen and (max-width: 375px) {
  #app {
    background-color: red;
    .wrap {
      width: 100%;
      height: 50%;
    }
  }
}
</style>
