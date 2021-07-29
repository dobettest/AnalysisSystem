const path = require('path')
module.exports = {
    mode:"production",
    entry: {
        echarts: "./src/lib/echarts.js"
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "build"),
        libraryTarget: "umd",
        libraryExport:"default",
        library:"echarts"
    }
}