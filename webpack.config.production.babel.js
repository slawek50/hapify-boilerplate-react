/*
 * Production Webpack Config
 */

import TerserPlugin from 'terser-webpack-plugin';
import commonConfig from './webpack.config.common';

module.exports = {
  ...commonConfig,
  mode: 'production',
  optimization: {
    ...commonConfig.optimization,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
