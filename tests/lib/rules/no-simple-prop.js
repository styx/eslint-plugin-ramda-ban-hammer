/**
 * @fileoverview Forbids R.prop(&#39;key&#39;, obj)
 * @author Mikhail Pabalavets
 */

const rule = require('../../../lib/rules/no-simple-prop');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-simple-prop', rule, {
  valid: [{
    code: "R.prop('key')",
  },
  {
    code: 'R.prop(key)',
  },
  {
    code: 'R.prop(R.__, icons)',
  },
  ],

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
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: 'R.prop(`inner-switched-${classNamePostfix}`, styles)',
      // eslint-disable-next-line no-template-curly-in-string
      output: 'styles[`inner-switched-${classNamePostfix}`]',
      errors: [{
        message: 'Prefer simple obj.key or obj?.key or obj[key]',
        type: 'CallExpression',
      }],
    },
  ],
});
