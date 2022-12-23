const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/ARToolkitPlus.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ARToolKitPlus.js',
    library: "ARToolKitPlus",
    libraryTarget: "umd",
    // @see: https://github.com/webpack/webpack/issues/3929
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    // @see https://stackoverflow.com/questions/59487224/webpack-throws-error-with-emscripten-cant-resolve-fs
    fallback: {
        fs: false,
        path: false,
        crypto: false,
      },
  },
};

module.exports = config;