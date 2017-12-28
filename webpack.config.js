const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/options.js',
    // background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'src', 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // '@babel/preset-env',
              '@babel/preset-react',
              // ["env", {
              //   "targets": {
              //     "chrome": 52,
              //   }
              // }]
            ],
            plugins: [
              ['transform-class-properties', { spec: true }],
              'transform-async-to-generator',
            ]
          }
        }
      },
      // {
      //   test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
      //   use: 'file-loader?limit=100000'
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: [
      //     'file-loader?limit=100000',
      //     {
      //       loader: 'img-loader',
      //       options: {
      //         enabled: true,
      //         optipng: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
}
