<template>
  <a-card :title="title" :hoverable="true" :bordered="false" class="card-container">
    <div class="chart" ref="panel" />
    <template slot="extra">
      <ul class="extra-list">
        <li class="extra-item">
          <svg-icon icon="edit"></svg-icon>
        </li>
        <li class="extra-item" @click="screenfy">
          <svg-icon :icon="isFull ? 'collpase' : 'expand'"></svg-icon>
        </li>
        <li class="extra-item">
          <svg-icon icon="more"></svg-icon>
        </li>
      </ul>
    </template>
  </a-card>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';

export default {
  name: 'chart',
  mixins: [resize],
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'xxx'
    },
    isFull: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      let { option } = this;
      this.myChart = echarts.init(this.$refs.panel);
      this.myChart.setOption(option, true);
    },
    screenfy() {
      let { title, option, isFull } = this;
      isFull = !isFull;
      this.$bus.$emit('screenfy', { option, isFull, title });
    }
  }
};
</script>
<style scoped lang="scss">
.card-container {
  .chart {
    height:280px;
    will-change:height;
  }
  .extra-list {
    display: none;
    .extra-item {
      margin: 0 4px;
      list-style: none;
      float: left;
    }
  }
  &:hover .extra-list {
    display: block;
  }
}
</style>
