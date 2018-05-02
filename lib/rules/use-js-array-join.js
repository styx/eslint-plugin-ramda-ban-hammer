/**
 * @fileoverview Use Array.prototype.join instead of R.join
 * @author Mikhail Pabalavets
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Use Array.prototype.join instead of R.join',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    function isJoin(node) {
      return node.callee.type === 'MemberExpression' &&
      node.callee.object && node.callee.object.name === 'R' &&
      node.callee.property && node.callee.property.name === 'join' &&
      node.arguments.length === 2;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (isJoin(node)) {
          context.report({
            node,
            message: 'Use Array.prototype.join instead of R.join',

            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const arrayCode = sourceCode.getText(node.arguments[1]);
              const separatorCode = sourceCode.getText(node.arguments[0]);
              const result = `${arrayCode}.join(${separatorCode})`;

              return fixer.replaceText(node, result);
            },
          });
        }
      },
    };
  },
};
