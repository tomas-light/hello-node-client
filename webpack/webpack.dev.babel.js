import { merge } from 'webpack-merge';

import common from './webpack.common';
import { cssRule } from './rules/css-rule-dev';

const devWebpackConfig = merge(
    common,
    {
        mode: 'development',
        devtool: 'eval-source-map',
    },
    cssRule()
);

module.exports = devWebpackConfig;
