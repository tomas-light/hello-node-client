import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import prodWebpackConfig from './webpack.prod.babel';

const devWebpackConfig = merge(prodWebpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});

module.exports = devWebpackConfig;
