export function cssRule() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: 'css-loader'
        },
      ],
    },
  };
}
