const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV

const config = {
  devtool: env === 'dev' && 'source-map',
  entry: {
    main: './static/scripts/main.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, './static/build/'),
    publicPath: "/build/",
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    })
  )
}

module.exports = config
