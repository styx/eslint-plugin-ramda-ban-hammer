/**
 * @fileoverview Forbid R.compose when it is called at the same place
 * @author no-compose-overuse
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-compose-overuse');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('no-compose-overuse', rule, {

  valid: [
    {code: "R.compose(createAction, R.prop('FETCH_ALL_WITH_CONTENTS_REQUEST'))"},
    {code: 'R.compose(createAction, someFunc1, someFunc2)'},
  ],

  invalid: [
    {
      code: "R.compose(createAction, R.prop('FETCH_ALL_WITH_CONTENTS_REQUEST'))(types)",
      output: "createAction(R.prop('FETCH_ALL_WITH_CONTENTS_REQUEST', types))",
      errors: [{
        message: "Don't use R.compose when it is called at the same place",
        type: 'CallExpression',
      }],
    },
    {
      code: 'R.compose(createAction, someFunc1, someFunc2)(types)',
      output: 'createAction(someFunc1(someFunc2(types)))',
      errors: [{
        message: "Don't use R.compose when it is called at the same place",
        type: 'CallExpression',
      }],
    },
    {
      code: 'R.compose(R.path(["campaign", "askRemoveCampaingId"]), getState)()',
      output: 'R.path(["campaign", "askRemoveCampaingId"])(getState())',
      errors: [{
        message: "Don't use R.compose when it is called at the same place",
        type: 'CallExpression',
      }],
    },
  ],
});
