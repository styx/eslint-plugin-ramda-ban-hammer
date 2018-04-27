/**
 * @fileoverview Removes imported R module if no references found
 * @author Mikhail Pabalavets
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unused-r-import"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-unused-r-import", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "import * as R from 'ramda';",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
