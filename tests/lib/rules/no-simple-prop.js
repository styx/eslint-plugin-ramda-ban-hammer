/**
 * @fileoverview Forbids R.prop(&#39;key&#39;, obj)
 * @author Mikhail Pabalavets
 */

const rule = require('../../../lib/rules/no-simple-prop');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester();
ruleTester.run('no-simple-prop', rule, {
  valid: [{
    code: "R.prop('key')",
  },
  {
    code: 'R.prop(key)',
  }],

  invalid: [
    {
      code: "R.prop('key', obj)",
      output: 'obj.key',
      errors: [{
        message: 'Prefer simple obj.key or obj?.key or obj[key]',
        type: 'CallExpression',
      }],
    },
    {
      code: "R.prop('key-1', obj)",
      output: "obj['key-1']",
      errors: [{
        message: 'Prefer simple obj.key or obj?.key or obj[key]',
        type: 'CallExpression',
      }],
    },
    {
      code: 'R.prop(key, obj)',
      output: 'obj[key]',
      errors: [{
        message: 'Prefer simple obj.key or obj?.key or obj[key]',
        type: 'CallExpression',
      }],
    },
    {
      code: 'R.prop("key", obj.call({}))',
      output: 'obj.call({}).key',
      errors: [{
        message: 'Prefer simple obj.key or obj?.key or obj[key]',
        type: 'CallExpression',
      }],
    },
  ],
});
