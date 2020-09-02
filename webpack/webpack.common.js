import path from "path";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import { tsRule } from "./rules/ts-rule";
import { imgRule } from "./rules/img-rule";
import { fontRule } from "./rules/font-rule";

const rootPath = path.join(__dirname, "..");

const publicPath = path.join(rootPath, "public");
const outputPath = path.join(publicPath, "js");
const htmlTemplatePath = path.join(publicPath, "templates", "index.html");

const appPath = path.join(rootPath, "src", "index.tsx");

const commonWebpackConfig = merge(
    {
        node: {
            fs: "empty"
        },
        entry: {
            app: appPath,
        },
        output: {
            filename: "[name].bundle.[contenthash].js",
            publicPath: "/js/",
            path: outputPath,
        },
        resolve: {
            extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
            modules: [ rootPath, "node_modules" ]
        },
        plugins: [
            // increase build performance
            new ForkTsCheckerWebpackPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                inject: "body",
                chunks: [ "app" ],
                template: htmlTemplatePath,
                filename: path.join(publicPath, "index.html"),
            }),
            new ManifestPlugin(),
        ],
    },
    tsRule(),
    imgRule(),
    fontRule(),
);

module.exports = commonWebpackConfig;
