<!--
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 22:26:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-antd-admin\src\views\echarts\bar\index.vue
-->
<template>
  <!--<div class="bar-wrapper">
    <a-row :gutter="24" class="bar-list">
      <a-col :span="12">
        <chart-panel title="游戏时长统计图" :hoverable="true" :bordered="false" :option="gradientsOptions">
        </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel title="运动类目统计图" :hoverable="true" :bordered="false" :option="sportBarOptions">
        </chart-panel>
      </a-col>
    </a-row>

    <a-row class="bar-list">
      <chart-panel :hoverable="true" :bordered="false"> </chart-panel>
    </a-row>

    <a-row :gutter="24" class="bar-list">
      <a-col :span="12">
        <chart-panel title="游戏热度统计图" :hoverable="true" :bordered="false" :option="gameOptions"> </chart-panel>
      </a-col>
      <a-col :span="12">
        <chart-panel title="运动得分" :hoverable="true" :bordered="false" :option="pieBarOptions"> </chart-panel>
      </a-col>
    </a-row>
  </div>-->
  <div class="card-list">
    <div class="card-item" v-for="(item, index) in list" :key="index">
      <chart-panel :cardInfo="item"></chart-panel>
    </div>
  </div>
</template>

<script>
import { gradientsBar, moreBar, doubleBar, groupBar, pieBar } from './components';
import echarts from 'echarts';
import request from '@/utils/request';
const colorList = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];
export default {
  name: 'bar',
  components: { gradientsBar, moreBar, doubleBar, groupBar, pieBar },
  data() {
    return {
      gradientsOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [5, 10]
        },
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '20',
            barGap: '80%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#5171fd'
                  },
                  {
                    offset: 1,
                    color: '#c97afd'
                  }
                ])
              }
            }
          },
          {
            type: 'line'
          }
        ],
        dataset: {
          dimensions: ['时间', '游戏时长'],
          source: [
            ['星期一', 60, 60],
            ['星期二', 75, 75],
            ['星期三', 55, 55],
            ['星期四', 40, 40],
            ['星期五', 100, 100],
            ['星期六', 140, 140],
            ['星期天', 160, 160]
          ]
        }
      },
      sportBarOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [5, 10]
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 30
        },
        legend: {
          show: true,
          itemWidth: 16,
          itemHeight: 12
        },
        xAxis: [
          {
            type: 'category',
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
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '8',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: colorList[0]
              }
            }
          },
          {
            type: 'bar',
            barWidth: '8',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#3dadf6'
                  },
                  {
                    offset: 1,
                    color: '#737bfc'
                  }
                ])
              }
            }
          },
          {
            type: 'bar',
            barWidth: '8',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ea677c'
                  },
                  {
                    offset: 1,
                    color: '#ef9b5f'
                  }
                ])
              }
            }
          },
          {
            type: 'bar',
            barWidth: '8',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: colorList[2]
              }
            }
          }
        ],
        dataset: {
          dimensions: ['时间', '篮球', '羽毛球', '乒乓球', '足球'],
          source: [
            ['星期一', 30, 60, 45, 34],
            ['星期二', 20, 36, 23, 45],
            ['星期三', 23, 26, 36, 23],
            ['星期四', 18, 27, 28, 43],
            ['星期五', 17, 56, 55, 36],
            ['星期六', 28, 26, 29, 27],
            ['星期天', 31, 36, 39, 23]
          ]
        }
      },
      gameOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [5, 10]
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 30
        },
        legend: {
          show: true,
          itemWidth: 16,
          itemHeight: 12
        },
        xAxis: [
          {
            type: 'category',
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
            }
          }
        ],
        series: [
          {
            type: 'bar',
            stack: 'PC',
            barWidth: '12',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#5171fd'
              }
            }
          },
          {
            type: 'bar',
            stack: 'PC',
            barWidth: '12',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#3dadf6'
              }
            }
          },
          {
            type: 'bar',
            stack: 'mobile',
            barWidth: '12',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ea677c'
              }
            }
          },
          {
            type: 'bar',
            stack: 'mobile',
            barWidth: '12',
            barGap: '20%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ef9b5f'
              }
            }
          }
        ],
        dataset: {
          dimensions: ['时间', 'LOL', 'DNF', '和平精英', '王者荣耀'],
          source: [
            [2016, 700, 600, 550, 420],
            [2017, 1500, 2800, 3500, 2900],
            [2018, 1600, 2800, 3500, 2000],
            [2019, 1600, 2300, 2800, 3300]
          ]
        }
      },
      pieBarOptions: {
        title: [
          {
            text: '85分',
            textStyle: {
              color: '#5171fd',
              fontSize: 35
            },
            top: 'center',
            left: 'center'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [5, 10]
        },
        angleAxis: {
          max: 100,
          clockwise: true,
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '150%'
        },
        series: [
          {
            type: 'bar',
            data: [85],
            showBackground: true,
            backgroundStyle: {
              color: '#cecece'
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#5171fd'
                  },
                  {
                    offset: 1,
                    color: '#c97afd'
                  }
                ]),
                shadowBlur: 5,
                shadowColor: '#2A95F9'
              }
            }
          }
        ]
      },
      list: []
    };
  },
  methods: {
    async getCardList() {
      const { data } = await request.post('/dashbord/list', { company: 'ecut', group: '年龄' });
      this.list = data;
      console.log("list getData")
    }
  },
  mounted() {
    this.getCardList();
  }
};
</script>
<style lang="scss" scoped>
.card-list {
  width: 100%;
  height: 100%;
  .card-item {
    padding:0 15px;
    width: 50%;
    display: inline-block;
  }
}
</style>
