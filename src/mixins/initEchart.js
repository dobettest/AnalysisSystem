export default {
    methods: {
        init: function (el, options, flag = true) {
            return new Promise((resolve, reject) => {
                let myChart = null;
                import('echart').then((echarts) => {
                    return Promise.resolve(echarts.default)
                }).then((echarts) => {
                    myChart = echarts.init(el);
                    myChart.setOption(options, flag);
                    resolve(myChart)
                }).catch(error => {
                    console.log("error", error);
                    reject(null)
                })
            })
        }
    }
}