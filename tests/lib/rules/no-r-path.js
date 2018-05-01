/**
 * @fileoverview Get rid from R.path when possible
 * @author Mikhail Pabalavets
 */

const rule = require('../../../lib/rules/no-r-path');

const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-r-path', rule, {

  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "R.path(['string', 'isRequired'], PropTypes)",
      output: 'PropTypes.string.isRequired',
      errors: [{
        message: "Don't use R.path with PropTypes",
        type: 'CallExpression',
      }],
    },
  ],
});
