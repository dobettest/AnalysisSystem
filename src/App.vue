<template>
  <div id="app">
    <chart v-if="isFull" :title="title" :isFull="isFull" class="full" :option="option"></chart>
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
      option: null
    };
  },
  mounted() {
    let chart = null;
    this.$bus.$on('screenfy', props => {
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
  .full .ant-card-body {
    height: calc(100% - 60px);
    .chart{
      height: 100%;
    }
  }
  .full,
  .full .ant-card {
    height: 100%;
  }
  .full .ant-card-head {
    height: 60px;
  }
}
</style>
