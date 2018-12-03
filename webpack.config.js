const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJS = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'kyc-widget.app.js',
    // libraryTarget: "var",
    // library: "kycWidget"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      { test: /(\.css$)/, 
        loaders: ['style-loader', 'css-loader', 'sass-loader'] 
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'ustack-comp-lib.vendor.js',
    //     minChunks(module, count) {
    //         var context = module.context;
    //         return context && context.indexOf('node_modules') >= 0;
    //     },
    // }),
    new UglifyJS({ uglifyOptions: { warnings: false } }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
    // ,
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || [])
  // .concat([
  //   new webpack.optimize.CommonsChunkPlugin({
  //       name: 'vendor',
  //       filename: 'ustack-comp-lib.vendor.js',
  //       minChunks(module, count) {
  //           var context = module.context;
  //           return context && context.indexOf('node_modules') >= 0;
  //       },
  //   })
  // ])
}
