module.exports={
  mode: 'development',
  context: 'F:\\web\\miscro-cloud-station',
  devtool: 'cheap-source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'F:\\web\\miscro-cloud-station\\miscro-cloud-station',
    filename: 'js/[name].js',
    publicPath: '',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'F:\\web\\miscro-cloud-station\\src',
      vue$: 'vue/dist/vue.esm.js',
      echart: 'F:\\web\\miscro-cloud-station\\src\\lib\\echarts.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'F:\\web\\miscro-cloud-station\\node_modules',
      'F:\\web\\miscro-cloud-station\\node_modules\\_@vue_cli-service@4.5.13@@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // 炉\_(銉?_/炉
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // 炉\_(銉?_/炉
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'F:\\web\\miscro-cloud-station\\node_modules\\_@vue_cli-plugin-babel@4.5.13@@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'F:\\web\\miscro-cloud-station\\node_modules',
      'F:\\web\\miscro-cloud-station\\node_modules\\_@vue_cli-service@4.5.13@@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // 炉\_(銉?_/炉
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\web\\miscro-cloud-station\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '3bf34e74'
            }
          },
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-loader@15.9.6@vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'F:\\web\\miscro-cloud-station\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '3bf34e74'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          'F:\\web\\miscro-cloud-station\\src\\icons'
        ],
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_raw-loader@0.5.1@raw-loader\\index.js'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  prependData: '@import "~@/styles/variables.scss";',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_vue-style-loader@4.1.3@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\web\\miscro-cloud-station\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '04a9cf7a'
            }
          },
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_babel-loader@8.2.2@babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'F:\\web\\miscro-cloud-station\\node_modules\\_@vue_cli-service@4.5.13@@vue\\cli-service\\lib'
        ],
        use: [
          {
            loader: 'F:\\web\\miscro-cloud-station\\node_modules\\_eslint-loader@2.2.1@eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '3f2b345d',
              emitWarning: true,
              emitError: false,
              eslintPath: 'F:\\web\\miscro-cloud-station\\node_modules\\_eslint@6.8.0@eslint',
              formatter: undefined
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          'F:\\web\\miscro-cloud-station\\src\\icons'
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            output: {
              comments: /^\**!|@preserve|@license|@cc_on/i
            },
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_BASE_API: '"/mock"',
          VUE_APP_BASE_NAME: '"miscro-cloud-station"',
          BASE_URL: '""'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'miscro-cloud-station',
        templateParameters: function () { /* omitted long function */ },
        template: 'F:\\web\\miscro-cloud-station\\public\\index.html'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'F:\\web\\miscro-cloud-station\\public',
          to: 'F:\\web\\miscro-cloud-station\\miscro-cloud-station',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    )
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  externals: {}
}
