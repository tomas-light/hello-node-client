const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.5"
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
];

const alias = {
    "@utils": "./src/utils",
};

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    [
        "babel-plugin-module-resolver",
        {
            root: [ "./src/" ],
            alias,
        },
    ],
];

/** @type {import("@babel/core").TransformOptions} */
const babelConfig = {
    presets,
    plugins,
};

module.exports = babelConfig;
