"use strict";
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack')
const resolve = (dir) => {
    return path.join(__dirname, dir);
}
module.exports = {
    mode: 'development',
    entry: {
        app: [resolve("src/main.js")]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        }
    },
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        alias: {
            '@': resolve("src"),
            echart: resolve('src/lib/echarts.js'),
            '@ant-design/icons/lib/dist$': resolve('src/lib/icon.js'),
            vue$: 'vue/dist/vue.esm.js',
            'my-vue-ui': resolve("src/components")
        },
        extensions: ['.mjs', '.js', '.jsx', '.vue'],
        fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify"), vm: require.resolve('vm-browserify'),"path": require.resolve("path-browserify") }
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                whitespace: 'condense'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        include: resolve('src/icons'),
                        use: [{
                            loader: 'svg-sprite-loader',
                            options: {
                                symbolId: 'icon-[name]'
                            }
                        }]
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(s?css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "~@/styles/variables.scss";`
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|mp3)(\?.*)?$/,
                type: 'asset',
                exclude: resolve("src/icons"),
                //解析
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 4 * 1024, // 25kb
                    }
                },
                generator: {
                    //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: 'img/[name].[contenthash:8][ext]',
                    //打包后对资源的引入，文件命名已经有/img了
                    publicPath: '../'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "微云台",
            favicon: resolve("public/favicon.ico"),
            template: resolve("public/index.html"),
            inject: 'body',
            templateParameters: {
                cdn: {
                    js: [],
                    css: []
                }
            }
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve('public'),
                    to: resolve('dist'),
                    toType: 'dir',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: [
                            '.DS_Store',
                            '**/*.html'
                        ]
                    }
                }
            ]
        }),
        new ProvidePlugin({
            TIM: 'tim-js-sdk/tim-js-friendship.js',
            _:'lodash'
        })
    ]
}