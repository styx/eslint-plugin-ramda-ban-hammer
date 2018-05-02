/**
 * @fileoverview Use Array.prototype.join instead of R.join
 * @author Mikhail Pabalavets
 */

const rule = require('../../../lib/rules/use-js-array-join');

const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('use-js-array-join', rule, {

  valid: [
    {code: 'R.join(".")'},
  ],

  invalid: [
    {
      code: "R.join('/', [baseUrlPath, serviceType, 'token'])",
      output: "[baseUrlPath, serviceType, 'token'].join('/')",
      errors: [{
        message: 'Use Array.prototype.join instead of R.join',
        type: 'CallExpression',
      }],
    },
  ],
});
