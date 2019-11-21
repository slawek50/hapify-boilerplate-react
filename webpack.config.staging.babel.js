/*
 * Staging Webpack Config
 */

import commonConfig from './webpack.config.common';

module.exports = {
  ...commonConfig,
  devtool: 'source-map',
};
