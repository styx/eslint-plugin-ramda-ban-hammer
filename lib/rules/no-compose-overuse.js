/**
 * @fileoverview Forbid R.compose when it is called at the same place
 * @author Mikhail Pabalavets
 */

module.exports = {
  meta: {
    docs: {
      description: 'Forbid R.compose when it is called at the same place',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    function isComposeWithArg(node) {
      return node.callee.type === 'CallExpression' &&
      node.callee.callee.object && node.callee.callee.object.name === 'R' &&
      node.callee.callee.property && node.callee.callee.property.name === 'compose';
    }
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (isComposeWithArg(node)) {
          context.report({
            node,
            message: "Don't use R.compose when it is called at the same place",

            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const argument = node.arguments[0];
              const argumentCode = argument ? sourceCode.getText(argument) : '';

              const functions = node.callee.arguments.reduce((acc, e) => {
                acc.push(sourceCode.getText(e));
                return acc;
              }, []).reverse();

              const firstFuncCode = functions.shift();

              let result;
              if (firstFuncCode.slice(-1) === ')') {
                result = firstFuncCode.replace(/\)$/, `, ${argumentCode})`);
              } else {
                result = `${firstFuncCode}(${argumentCode})`;
              }

              functions.forEach((func) => {
                result = `${func}(${result})`;
              });

              return fixer.replaceText(node, result);
            },
          });
        }
      },
    };
  },
};
