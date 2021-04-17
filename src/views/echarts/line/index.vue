<template>
  <div class="line-wrapper">
    <a-row :gutter="24" class="line-list">
      <a-col :span="12">
        <chart-panel title="时间管理统计图" :hoverable="true" :bordered="false" :option="timecountOption">
        </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel title="气温统计图" :hoverable="true" :bordered="false" :option="weatherOption"> </chart-panel>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="line-list">
      <a-col :span="12">
        <chart-panel title="LOL经济与伤害对比图" :hoverable="true" :bordered="false">
          <stack-line class="chart-line" />
        </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel title="LOL直播人气值" :hoverable="true" :bordered="false">
          <other-line class="chart-line" />
        </chart-panel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { onlyLine, moreLine, stackLine, otherLine } from './components';
import echarts from 'echarts';
export default {
  name: 'lineChart',
  components: { onlyLine, moreLine, stackLine, otherLine },
  data() {
    return {
      timecountOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 30
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#cecece'
              }
            },
            axisLabel: {
              color: '#666'
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              snap: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#cecece'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              show: false
            },
            axisPointer: {
              snap: true
            }
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: true,
            lineStyle: {
              normal: {
                color: '#5171fd' // 线条颜色
              }
            },
            itemStyle: {
              color: '#5171fd',
              borderColor: '#fff'
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#5171fd'
                    },
                    {
                      offset: 0.5,
                      color: '#5171fd'
                    },
                    {
                      offset: 1,
                      color: 'rgba(127,153,255,0.1)'
                    }
                  ],
                  false
                )
              }
            }
          }
        ],
        dataset: {
          dimensions: ['时间', '气温'],
          source: [
            ['6:00', 60],
            ['9:00', 75],
            ['12:00', 55],
            ['15:00', 40],
            ['18:00', 100],
            ['21:00', 140],
            ['24:00', 160]
          ]
        }
      },
      weatherOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 65
        },
        legend: {
          show: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#cecece'
              }
            },
            axisLabel: {
              color: '#666'
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              snap: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#cecece'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              show: false
            },
            axisPointer: {
              snap: true
            }
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: true,
            markPoint: {
              data: [
                {
                  name: '周最高',
                  value: 39,
                  xAxis: 2,
                  yAxis: 39,
                  symbolSize: 40
                }
              ]
            },
            lineStyle: {
              normal: {
                width: 4,
                color: '#F6D06F', // 线条颜色
                shadowColor: 'rgba(246,208,111, 0.85)',
                shadowBlur: 10,
                shadowOffsetY: 6
              }
            },
            itemStyle: {
              color: '#F6D06F',
              borderColor: '#F6D06F',
              borderWidth: 0
            }
          },
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: true,
            markPoint: {
              data: [
                {
                  name: '周最低',
                  value: 22,
                  xAxis: 1,
                  yAxis: 22,
                  symbolSize: 40
                }
              ]
            },
            lineStyle: {
              normal: {
                width: 4,
                color: '#5171fd', // 线条颜色
                shadowColor: 'rgba(66,102,247, 0.55)',
                shadowBlur: 10,
                shadowOffsetY: 6
              }
            },
            itemStyle: {
              color: '#5171fd',
              borderColor: '#5171fd',
              borderWidth: 0
            }
          }
        ],
        dataset: {
          dimensions: ['时间', '最高气温', '最低气温'],
          source: [
            ['10-1', 32, 25],
            ['10-2', 34, 22],
            ['10-3', 35, 26],
            ['10-4', 39, 28],
            ['10-5', 38, 27],
            ['10-6', 36, 26],
            ['10-7', 34, 23]
          ]
        }
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.line-list {
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
