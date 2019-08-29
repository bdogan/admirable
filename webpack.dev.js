const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/admirable.ts',
  devtool: 'source-map',
  devServer: {
      open: true
  },
  node: {
    __filename: true
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|gif|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'p5-image-loader',
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'admirable.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLPlugin({
        template: './src/index.html',
    })
  ]
};
