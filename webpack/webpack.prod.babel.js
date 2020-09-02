import { merge } from "webpack-merge";
import TerserPlugin from 'terser-webpack-plugin';

import common from "./webpack.common";

const prodWebpackConfig = merge(common, {
    mode: "production",
    optimization: {
        moduleIds: "hashed",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
                shared: {
                    test: /[\\/]shared[\\/]/,
                    name: "shared",
                    chunks: "all",
                },
            },
        },
        minimizer: [
            new TerserPlugin(),
        ]
    },
});

module.exports = prodWebpackConfig;
