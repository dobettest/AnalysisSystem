"use strict";
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { ProvidePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const minimist = require('minimist');
const resolve = (dir) => {
    return path.join(__dirname, dir);
}
const isProd = process.env.NODE_ENV === 'production';
const resolveClientEnv = () => {
    const { parsed: dotconfig } = dotenv.config({
        path: resolve([".env.", process.env.NODE_ENV].join(''))
    })
    const args = minimist(process.argv.slice(4), {
        boolean: [
            'report'
        ]
    })
    console.log(process.argv, args)
}
resolveClientEnv();
const { VueCDN, AxiosCDN, VueRouterCDN, VuexCDN, i18n, timJsSdk } = require('./src/plugins/cdn');
const cdn = {
    css: [],
    js: [VueCDN, AxiosCDN, VueRouterCDN, VuexCDN, i18n, timJsSdk],
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'vue-i18n': 'VueI18n',
        xlsx: 'XLSX',
        three: 'THREE',
        'tim-js-sdk': 'TIM'
    }
};
module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        app: [resolve("src/main.js")]
    },
    output: {
        path: resolve("dist"),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
        publicPath: isProd ? 'https://cdn.dobettest.cn' : './'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host: '0.0.0.0',
        port: 8081,
        https: false
    },
    resolve: {
        alias: {
            '@': resolve("src"),
            echart: resolve('src/lib/echarts.js'),
            '@ant-design/icons/lib/dist$': resolve('src/lib/icon.js'),
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
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
                include: resolve('src/icons'),
                use: [{
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: 'icon-[name]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
                                javascriptEnabled: true,
                                strictMath: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            // use explicit fallback to avoid regression in url-loader>=1.1.0
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[contenthash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    externals: isProd ? cdn.externals : {},
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    },
    optimization: {
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }
        }), new CssMinimizerPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                },
                commons: {
                    name: 'chunk-commons',
                    test: /[\\/]src[\\/]js[\\/]/,
                    minChunks: 2, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new ProvidePlugin({
            process: 'process/browser'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            favicon: resolve("public/favicon.ico"),
            template: resolve("public/index.html"),
            inject: 'body',
            templateParameters: {
                cdn: cdn
            }
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new BundleAnalyzerPlugin(),
        new IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
        new CompressionWebpackPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            minRatio: 0.8
        }),
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
        })
    ]
}