'use strict'

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow usage of Ember\'s getProperties() with an array of properties',
            recommended: true
        },
        fixable: 'code',
        schema: [], // no options
        messages: {
            unexpectedGetPropertiesCall: 'Use getProperties without an array with properties.'
        }
    },
    create: function(context) {
        return {
            CallExpression(node) {
                const { callee, arguments: callArgs } = node

                if (callee.type === 'Identifier' && callee.name === 'getProperties'
                    && callArgs.length === 2 && callArgs[0].type === 'Identifier'
                    && callArgs[1].type === 'ArrayExpression'
                ) {
                    const sourceCode = context.getSourceCode()

                    context.report({
                        node: node,
                        messageId: 'unexpectedGetPropertiesCall',
                        fix: (fixer) => {
                            return fixer.replaceText(
                                node.arguments[1],
                                sourceCode.getText(node.arguments[1]).replace(/^\[ *| *]$/g, '')
                            )
                        }
                    })
                } else if (callee.type === 'MemberExpression' && callee.object.type === 'ThisExpression'
                    && callee.property.type === 'Identifier' && callee.property.name === 'getProperties'
                    && callArgs.length === 1 && callArgs[0].type === 'ArrayExpression'
                ) {
                    const sourceCode = context.getSourceCode()

                    context.report({
                        node: node,
                        messageId: 'unexpectedGetPropertiesCall',
                        fix: (fixer) => {
                            return fixer.replaceText(
                                node.arguments[0],
                                sourceCode.getText(node.arguments[0]).replace(/^\[ *| *]$/g, '')
                            )
                        }
                    })
                }
            }
        }
    }
}
