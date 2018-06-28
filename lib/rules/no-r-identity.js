/**
 * @fileoverview Removes R.identity
 * @author Anton Savicky
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Removes R.identity',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    function isIdentity(node) {
      return node.type === 'MemberExpression' &&
      node.object && node.object.name === 'R' &&
      node.property && node.property.name === 'identity';
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      MemberExpression(node) {
        if (isIdentity(node)) {
          context.report({
            node,
            message: "Don't use R.identity",

            fix(fixer) {
              const result = '() => {}';
              return fixer.replaceText(node, result);
            },
          });
        }
      },
    };
  },
};
