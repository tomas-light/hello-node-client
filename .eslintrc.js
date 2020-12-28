module.exports = {
  root: true,
  globals: {
    window: true,
    document: true,
    nameof: true,
    JSX: true,
  },
  env: {
    browser: true,
    es6: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': 'tsconfig.json',
    'tsconfigRootDir': __dirname,
  },
  plugins: [
    'react',
    'react-hooks',
    'sonarjs',
    '@typescript-eslint',
  ],
  rules: {
    indent: [1, 2, { SwitchCase: 1 }],
    curly: [1, 'all'],
    'brace-style': [1, 'stroustrup'],
    'object-curly-newline': [1, {
      ObjectExpression: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
    }],
    'no-trailing-spaces': [1, {
      skipBlankLines: true,
      ignoreComments: true,
    }],
    'linebreak-style': 'off',
    'arrow-parens': [1, 'as-needed'],
    quotes: [1, 'single'],
    semi: [2, 'always'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    'prefer-destructuring': ['warn', {
      'array': true,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};
