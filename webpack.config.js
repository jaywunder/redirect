const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup: './src/popup/popup.js',
    // background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'src', 'build'),
    filename: '[name].bundle.js'
  },
  // Here we define loaders for different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src')
        ],
        use: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   })
      // },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=100000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?limit=100000',
          {
            loader: 'img-loader',
            options: {
              enabled: true,
              optipng: true
            }
          }
        ]
      }
    ]
  },
  // plugins: [
  //   // create CSS file with all used styles
  //   new ExtractTextPlugin('bundle.css'),
  //   // create popup.html from template and inject styles and script bundles
  //   new HtmlWebpackPlugin({
  //     inject: true,
  //     chunks: ['popup'],
  //     filename: 'popup.html',
  //     template: './src/popup.html'
  //   }),
  //   // copy extension manifest and icons
  //   new CopyWebpackPlugin([
  //     { from: './src/manifest.json' },
  //     { context: './src/assets', from: 'icon-**', to: 'assets' }
  //   ])
  // ]
}
