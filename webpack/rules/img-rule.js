export function imgRule() {
    return {
        module: {
            rules: [
                {
                    test: /\.(gif|png|jpg|jpeg)$/i,
                    loader: "url-loader?limit=10000000"
                },
            ],
        },
    };
}
