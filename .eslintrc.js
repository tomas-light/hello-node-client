module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      // required for eslint-plugin-import
      typescript: true,
    },
    'import/internal-regex': '^@elc/', // consider such import modules as "internal" to correct sorting
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:import/recommended', // sort "import" statements
    'prettier', // Disables ESLint rules that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/no-unescaped-entities': 'off',
    quotes: [1, 'single', 'avoid-escape'], // TODO: check the options
    'spaced-comment': ['error', 'always'],
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: './**.module.scss', // ./my.module.scss
            group: 'sibling',
            position: 'after',
          },
        ],
        groups: [
          // import fs from 'fs';
          'builtin',

          // import _ from 'lodash';
          'external',

          // import foo from 'src/foo';
          'internal',

          // import qux from '../../foo/qux';
          'parent',

          // import main from './';
          'index',

          // import baz from './bar/baz';
          'sibling',
        ],
      },
    ],
  },
  ignorePatterns: ['libs/*'],
};
