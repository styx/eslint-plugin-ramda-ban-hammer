/**
 * @fileoverview Removes R.identity
 * @author Anton Savicky
 */

const rule = require('../../../lib/rules/no-r-identity');

const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-r-identity', rule, {

  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: 'R.identity',
      output: '() => {}',
      errors: [{
        message: "Don't use R.identity",
        type: 'MemberExpression',
      }],
    },
  ],
});
