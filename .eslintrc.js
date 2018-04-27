module.exports = {
  extends: 'airbnb/base',

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  env: {
    es6: true,
    node: true,
    commonjs: true,
    mocha: true
  },

  globals: {
    Promise: true,
  },
  rules: {
    camelcase: 'off',
    'no-debugger': 'off',
    'class-methods-use-this': 'error',
    'no-mixed-operators': 'off',
    indent: ['error', 2],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'object-curly-spacing': ['error', 'never'],
    'func-names': ['error', 'as-needed'],
  }
};
