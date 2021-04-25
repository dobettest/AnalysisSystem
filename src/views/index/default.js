export default [
    {
        name: '游戏时长统计图',
        option: {
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
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
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
                    name: '游戏时长',
                    type: 'bar',
                    data: [60, 75, 55, 40, 100, 140, 160],
                    barWidth: '20',
                    barGap: '80%',
                    type: 'bar'
                }
            ]
        }
    },
    {
        name: '时间管理统计图',
        option: {
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
        }
    },
    {
        name: '爱吃食物分类',
        option: {
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
                itemHeight: 11,
                data: ['炸鸡', '火锅', '烤肉', '料理', '热干面', '奶茶']
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
                    data: [
                        {
                            name: '炸鸡',
                            value: 18
                        },
                        {
                            name: '火锅',
                            value: 35
                        },
                        {
                            name: '烤肉',
                            value: 37
                        },
                        {
                            name: '料理',
                            value: 20
                        },
                        {
                            name: '热干面',
                            value: 36
                        },
                        {
                            name: '奶茶',
                            value: 54
                        }
                    ],
                    label: {},
                    labelLine: {
                        normal: {
                            show: true
                        }
                    }
                }
            ]
        }
    }
]