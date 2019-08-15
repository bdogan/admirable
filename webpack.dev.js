const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  devtool: 'source-map',
  devServer: {
      open: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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
