const path = require('path');
const fs = require('fs');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
let paths = {
    appSrc: resolveApp('src'),
    appHtml: resolveApp('public/index.html'),
}
var config = {
    devtool: 'cheap-module-source-map',
    //"webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server"
    entry:  ['webpack-dev-server/client?http://localhost:9000/','webpack/hot/dev-server','./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    resolve: {
        extensions: ['.web.js', '.js', '.json', '.jsx'],
    },
    module: {
        strictExportPresence: true,
        rules: [
        //   {
        //     test: /\.(js|jsx)$/,
        //     enforce: 'pre',
        //     use: [
        //       {
        //         options: {
        //         //   formatter: eslintFormatter,
        //           eslintPath: require.resolve('eslint'),  
        //         },
        //         loader: require.resolve('eslint-loader'),
        //       },
        //     ],
        //     include: paths.appSrc,
        //   },
          {   
            oneOf: [
              {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
              // Process JS with Babel.
              {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true,
                  // "presets": [
                  //   "es2015",
                  //   "react"
                  // ],
                },
              },
              {
                test: /\.css$/,
                use: [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                    },
                  },
                //   {
                //     loader: require.resolve('postcss-loader'),
                //     options: {
                //       // Necessary for external CSS imports to work
                //       // https://github.com/facebookincubator/create-react-app/issues/2677
                //       ident: 'postcss',
                //       plugins: () => [
                //         require('postcss-flexbugs-fixes'),
                //         autoprefixer({
                //           browsers: [
                //             '>1%',
                //             'last 4 versions',
                //             'Firefox ESR',
                //             'not ie < 9', // React doesn't support IE8 anyway
                //           ],
                //           flexbox: 'no-2009',
                //         }),
                //       ],
                //     },
                //   },
                ],
              },
              {
                test: /\.less$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  { loader: 'less-loader' }
                ]
              },
              {
            
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                loader: require.resolve('file-loader'),
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          
        ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
}

module.exports = config;