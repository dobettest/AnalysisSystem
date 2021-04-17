export default {
  bar: {
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
        barWidth: '20',
        barGap: '80%',
        type: 'bar'
      }
    ],
    dataset: {
      //dimensions: [],
      source: []
    }
  },
  pie: {
    title: [
      {
        text: '85%',
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
      //dimensions: [],
      source: []
    }
  },
  line: {
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
        areaStyle: {}
      }
    ],
    dataset: {
      source: []
    }
  },
  wordcloud: {
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/> 搜素次数：{c} 次'
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [14, 28],
        rotationRange: [0, 0],
        width: '100%',
        shape: 'cardioid',
        gridSize: 10,
        top: 0,
        textStyle: {
          normal: {
            fontFamily: 'sans-serif'
          }
        }
      }
    ]
  }
};
