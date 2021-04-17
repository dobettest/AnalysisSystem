<template>
  <div ref="panel" class="panel"></div>
</template>

<script>
import echarts from 'echarts';
import resize from '@/mixins/resize';
require('echarts-wordcloud');
export default {
  name: 'panel',
  mixins: [resize],
  props: {
    option: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    options() {
      return this.option;
    }
  },
  watch: {
    options: {
      handler(nl, ol) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      console.log('chart init', this.options);
      this.myChart = echarts.init(this.$refs.panel);
      this.myChart.setOption(this.options);
    }
  }
};
</script>
<style lang="scss">
.panel {
  height: 280px;
  width: 100%;
}
</style>
