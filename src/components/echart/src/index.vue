<template>
  <div ref="card">
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
          <li class="extra-item more-list-container">
            <svg-icon icon="more"></svg-icon>
            <ul class="more-list">
              <li class="more-item" @click="exportImg">导出图片</li>
              <li class="more-item" @click="exportExcel">导出excel</li>
            </ul>
          </li>
        </ul>
      </template>
    </a-card>
  </div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
import html2canvas from 'html2canvas';
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
    },
    exportImg() {
      const boxDom = this.$refs.card;
      html2canvas(boxDom).then(res => {
        var dataUrl = res.toDataURL('image/jpeg', 1.0);
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${this.title}.png`;
        a.click();
      });
    },
    exportExcel() {
      //console.log(this.option);
      let { series, xAxis } = this.option;
      let header = [...xAxis[0].data];
      let data = [series[0].data];
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header,
          data,
          filename: `${this.title}`
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.card-container {
  .chart {
    height: 280px;
    will-change: height;
  }
  .extra-list {
    display: none;
    .extra-item {
      margin: 0 4px;
      list-style: none;
      float: left;
    }
    .more-list-container {
      position: relative;
      .more-list {
        display: none;
        position: absolute;
        left: -50%;
        top: 20px;
        padding: 0;
        //background-color: #fff;
        .more-item {
          width: 52px;
          list-style: none;
          font-size: 12px;
        }
      }
      &:hover {
        .more-list {
          display: block;
        }
      }
    }
  }
  &:hover .extra-list {
    display: block;
  }
}
</style>
