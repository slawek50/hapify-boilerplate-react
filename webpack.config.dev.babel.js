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
    port: 4200,
    contentBase: 'static/',
    historyApiFallback: true,
  },
};
