export function cssRule() {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader'],
                }
            ],
        },
    };
}
