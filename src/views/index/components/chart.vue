<template>
  <a-card :title="title" :hoverable="true" :bordered="false">
    <div class="chart" ref="panel" />
    <template slot="extra">
      <ul class="extra-list">
        <li class="extra-item">
          <svg-icon icon="edit"></svg-icon>
        </li>
        <li class="extra-item">
          <svg-icon icon="expand"></svg-icon>
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
    }
  }
};
</script>
<style scoped lang="scss">
.chart {
  height: 280px;
  width: 100%;
}
.extra-list {
  display: none;
  .extra-item {
    margin: 0 4px;
    list-style: none;
    float: left;
  }
}
</style>
