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
const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const resolve = (dir) => {
    return path.join(__dirname, dir);
}
const mode = process.env.NODE_ENV || 'development';
dotenv.config({
    path: resolve(['.env.', mode].join(''))
})
const isProd = process.env.NODE_ENV === 'production';
const resolvePlugin = isProd ? [new DefinePlugin({
    'process.env': JSON.stringify(process.env)
}),
new MiniCssExtractPlugin({
    filename: 'css/[contenthash:8].css',
    chunkFilename: 'css/[contenthash:8].css'
}),
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
})] : []
const { VueCDN, AxiosCDN, VueRouterCDN, VuexCDN, i18n, timJsSdk } = require('./src/plugins/cdn');
const { ProvidePlugin } = require('webpack');
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
        //publicPath: isProd ? 'https://cdn.dobettest.cn' : './'
        //publicPath: './'
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
            'vue-storage-plugin': resolve('src/lib/vue-storage-plugin')
        },
        extensions: ['.js', '.vue'],
        modules: ['node_modules'],
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                include: [resolve("src")],
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
                    isProd ?
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: (resourcePath, context) => {
                                    // publicPath 是资源相对于上下文的相对路径
                                    // 例如：对于 ./css/admin/main.css publicPath 将会是 ../../
                                    // 而对于 ./css/main.css publicPath 将会是 ../
                                    return path.relative(path.dirname(resourcePath), context) + '/';
                                }
                            }
                        } : 'style-loader',
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
                exclude:resolve("src/icons"),
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
    externals: isProd ? cdn.externals : {},
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    },
    optimization: isProd ? {
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    warnings: false,
                    //drop_console: true
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
    } : {},
    plugins: [
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new HtmlWebpackPlugin({
            title: "Hello App",
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
        new ProvidePlugin({

        }),
        //new ProgressBarPlugin(),
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
        })
    ].concat(resolvePlugin)
}