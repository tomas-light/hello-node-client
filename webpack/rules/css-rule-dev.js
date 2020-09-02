export function cssRule() {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path]_[name]_[local]',
                                },
                            }
                        },
                    ],
                }
            ],
        },
    };
}
