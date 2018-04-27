/**
 * @fileoverview Forbids R.prop('key', obj)
 * @author Mikhail Pabalavets
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Forbids R.prop('key', obj)",
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isSimpleRProp(node) {
      return (
        node.callee.object && node.callee.object.name === 'R' &&
        node.callee.property && node.callee.property.name === 'prop' &&
        node.arguments.length === 2
      );
    }

    function isKeyLiteral(node) {
      return node.arguments[0].type === 'Literal';
    }

    function containsSpecialChars(value) {
      return value.match(/-|\+|\?|<|>|\.|\\|\/|\{|\}|\[|\]|\*|;|:|@|!|#|\$|%|\^|&|\(|\)/g);
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (isSimpleRProp(node)) {
          context.report({
            node,
            message: 'Prefer simple obj.key or obj?.key or obj[key]',

            fix(fixer) {
              const prop = node.arguments[0];
              const sourceCode = context.getSourceCode();
              const reciver = sourceCode.getText(node.arguments[1]);

              if (isKeyLiteral(node)) {
                if (containsSpecialChars(node.arguments[0].value)) {
                  return fixer.replaceText(node, `${reciver}[${prop.raw}]`);
                }
                return fixer.replaceText(node, `${reciver}.${prop.value}`);
              }

              return fixer.replaceText(node, `${reciver}[${prop.name}]`);
            },
          });
        }
      },
    };
  },
};
