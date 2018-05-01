/**
 * @fileoverview Get rid from R.path when possible
 * @author Mikhail Pabalavets
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Get rid from R.path when possible',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    function isPath(node) {
      return node.callee.type === 'MemberExpression' &&
      node.callee.object && node.callee.object.name === 'R' &&
      node.callee.property && node.callee.property.name === 'path';
    }

    function isWithPropTypes(node) {
      return node.arguments &&
      node.arguments.length === 2 &&
      node.arguments[1].name === 'PropTypes';
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (isPath(node)) {
          if (isWithPropTypes(node)) {
            context.report({
              node,
              message: "Don't use R.path with PropTypes",

              fix(fixer) {
                const argument = node.arguments[0];
                const values = argument.elements.map(e => e.value);
                const result = ['PropTypes', ...values].join('.');

                return fixer.replaceText(node, result);
              },
            });
          }
        }
      },
    };
  },
};
