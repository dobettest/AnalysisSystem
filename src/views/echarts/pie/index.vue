<template>
  <div class="pie-wrapper">
    <a-row :gutter="24" class="pie-list">
      <a-col :span="12">
        <chart-panel title="爱吃食物分类" :hoverable="true" :bordered="false" :option="foodOption"> </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel title="技术占比" :hoverable="true" :bordered="false" :option="tecOption"> </chart-panel>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="pie-list">
      <a-col :span="12">
        <chart-panel title="衣服开销" :hoverable="true" :bordered="false" :option="clothesOption"> </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel :hoverable="true" :bordered="false">
          <annular-pie class="chart-line" />
        </chart-panel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { hollowPie, solidPie, radiusPie, annularPie } from './components';
import echarts from 'echarts';
const colorLost = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];
export default {
  name: 'pie',
  components: { hollowPie, solidPie, radiusPie, annularPie },
  data() {
    return {
      foodOption: {
        title: [
          {
            textStyle: {
              color: '#5171fd',
              fontSize: 25
            },
            top: 'center',
            left: 'center'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: params => {
            return params.marker + ' ' + params.name + '：' + params.value + ' (' + params.percent + '%)';
          }
        },
        legend: {
          show: true,
          left: '15',
          top: 0,
          type: 'scroll',
          itemWidth: 18,
          itemHeight: 11
        },

        series: [
          {
            name: '消费类型',
            type: 'pie',
            icon: 'circle',
            radius: ['35%', '55%'],
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            label: {},
            labelLine: {
              normal: {
                show: true
              }
            }
          }
        ],
        dataset: {
          dimensions: ['类别', '数量'],
          source: [
            ['炸鸡', 18],
            ['火锅', 35],
            ['烤肉', 37],
            ['料理', 20],
            ['热干面', 36],
            ['奶茶', 54]
          ]
        }
      },
      tecOption: {
        color: colorLost,
        tooltip: {
          trigger: 'item',
          formatter: params => {
            return params.value + ' (' + params.percent + '%)';
          }
        },
        legend: {
          show: true,
          left: '15',
          top: 0,
          type: 'scroll',
          itemWidth: 18,
          itemHeight: 11
        },
        series: [
          {
            name: '技术占比',
            type: 'pie',
            icon: 'circle',
            center: ['48%', '55%'],
            radius: '55%',
            label: {},
            labelLine: {
              normal: {
                show: true
              }
            }
          }
        ],
        dataset: {
          dimensions: ['Vue', 'Echarts', 'TypeScript', 'Webpack', 'Node', 'jQuery'],
          source: [
            ['Vue', 75],
            ['Echarts', 85],
            ['TypeScript', 70],
            ['Webpack', 75],
            ['Node', 45],
            ['jQuery', 65]
          ]
        }
      },
      clothesOption: {
        color: colorLost,
        tooltip: {
          trigger: 'item',
          formatter: params => {
            return params.marker + ' ' + params.name + '：' + params.value + ' (' + params.percent + '%)';
          }
        },
        legend: {
          show: true,
          left: '15',
          top: 0,
          type: 'scroll',
          itemWidth: 18,
          itemHeight: 11
        },
        series: [
          {
            name: '技术占比',
            type: 'pie',
            icon: 'circle',
            radius: ['35%', '55%'],
            center: ['48%', '55%'],
            roseType: 'radius',

            label: {},
            labelLine: {
              normal: {
                show: true
              }
            }
          }
        ],
        dataset: {
          source: [
            {
              name: '裤子',
              value: 254
            },
            {
              name: '外套',
              value: 136
            },
            {
              name: '卫衣',
              value: 292
            },
            {
              name: '短袖',
              value: 192
            },
            {
              name: '鞋子',
              value: 650
            },
            {
              name: '棉袄',
              value: 450
            }
          ]
        }
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.pie-list {
  height: 360px;
  margin-bottom: 25px;
  .chart-line {
    height: 280px;
    width: 100%;
  }
  /deep/ .ant-col {
    height: 100%;
  }
}
</style>
