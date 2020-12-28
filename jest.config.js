const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
    globals: {
        'ts-jest': {
            astTransformers: {
                before: [ 'ts-nameof' ],
            },
        },
    },
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths,
        {
            prefix: '<rootDir>/src/'
        }
    ),
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/**/*.test.ts',
        '<rootDir>/**/*.test.tsx',
    ],
    transformIgnorePatterns: [
        '<rootDir>/(node_modules)/'
    ],
};

module.exports = config;
