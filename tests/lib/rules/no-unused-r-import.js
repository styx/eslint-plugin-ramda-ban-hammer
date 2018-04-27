/**
 * @fileoverview Removes imported R module if no references found
 * @author Mikhail Pabalavets
 */

const rule = require('../../../lib/rules/no-unused-r-import');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
  },
});

ruleTester.run('no-unused-r-import', rule, {
  valid: [
    {code: 'const x = 1;\nconst y = 2;import * as _ from "lodash";\nconsole.log(x);'},
  ],

  invalid: [
    {
      code: "const x = 1;\nimport * as R from 'ramda';\nconsole.log(x);",
      output: 'const x = 1;\nconsole.log(x);',
      errors: [{
        message: 'Congrats! Now you can remove Ramda import.',
        type: 'ImportDeclaration',
      }],
    },
  ],
});
