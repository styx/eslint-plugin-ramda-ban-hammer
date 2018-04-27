/**
 * @fileoverview Forbids R.prop(&#39;key&#39;, obj)
 * @author Mikhail Pabalavets
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-simple-prop"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-simple-prop", rule, {

    valid: [
    ],

    invalid: [
        {
            code: "R.prop('key', obj)",
            errors: [{
                message: "Use obj.key or obj?.key",
                type: "ERROR_MSG_SIMPLE_R_PROP"
            }]
        }
    ]
});
