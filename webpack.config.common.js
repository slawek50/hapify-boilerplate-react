/*
 * Common Webpack Config
 */

import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageJSON from './package.json';

module.exports = {
  entry: [
    path.join(__dirname, './app/index'),
  ],
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VERSION: JSON.stringify(packageJSON.version),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './app/sw.js'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
      },
      {
        // activate source maps via loader query
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        include: [
          path.resolve('./node_modules/react-datepicker'),
          path.resolve('./node_modules/react-draft-wysiwyg'),
          path.resolve('./node_modules/react-sweet-progress'),
          path.resolve('./node_modules/antd'),
        ],
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(xml|manifest|webmanifest|svg|ico)/,
        loader: 'file-loader',
      },
      {
        test: /assets\/favicons\/.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: 'favicons/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'app',
      'node_modules',
    ],
    unsafeCache: true,
    extensions: [
      '.js',
      '.jsx',
      '.manifest',
      '.webmanifest',
      '.css',
      '.scss',
    ],
  },
};
