import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.common';
import { cssRule } from './rules/css-rule-prod';

const prodWebpackConfig = merge(
    common,
    {
        mode: 'production',
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    shared: {
                        test: /[\\/]shared[\\/]/,
                        name: 'shared',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [
                new TerserPlugin(),
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[name].[contenthash].css',
            }),
        ],
    },
    cssRule()
);

module.exports = prodWebpackConfig;
