/*
 * Development Webpack Config
 */

import commonConfig from './webpack.config.common';

module.exports = {
  ...commonConfig,
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    ...commonConfig.entry,
  ],
  devtool: 'source-map',
  devServer: {
    port: 4201,
    contentBase: 'static/',
    historyApiFallback: true,
  },
};
