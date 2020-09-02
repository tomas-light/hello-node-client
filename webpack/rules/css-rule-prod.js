import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function cssRule() {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        },
                    ],
                }
            ],
        },
    };
}
