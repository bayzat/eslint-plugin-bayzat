'use strict'
const unquotedValidator = require('unquoted-property-validator')

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow usage of Ember\'s get() to access flat property',
            recommended: true
        },
        fixable: 'code',
        schema: [], // no options
        messages: {
            unexpectedGetCall: 'Property {{ propertyName }} can be access directly.'
        }
    },
    create: function(context) {
        return {
            CallExpression(node) {
                const { callee, arguments: callArgs } = node

                if (callee.type === 'Identifier' && callee.name === 'get'
                    && callArgs.length === 2 && callArgs[0].type === 'Identifier'
                    && callArgs[1].type === 'Literal' && callArgs[1].value.indexOf('.') === -1
                    && unquotedValidator(callArgs[1].value).needsBrackets === false
                ) {
                    context.report({
                        node: node,
                        messageId: 'unexpectedGetCall',
                        data: {
                            propertyName: callArgs[1].value
                        },
                        fix: (fixer) => {
                            return fixer.replaceText(node, `${callArgs[0].name}.${callArgs[1].value}`)
                        }
                    })
                } else if (callee.type === 'MemberExpression' && callee.object.type === 'ThisExpression'
                    && callee.property.type === 'Identifier' && callee.property.name === 'get'
                    && callArgs.length === 1 && callArgs[0].type === 'Literal' && callArgs[0].value.indexOf('.') === -1
                    && unquotedValidator(callArgs[0].value).needsBrackets === false
                ) {
                    context.report({
                        node: node,
                        messageId: 'unexpectedGetCall',
                        data: {
                            propertyName: callArgs[0].value
                        },
                        fix: (fixer) => {
                            return fixer.replaceText(node, `this.${callArgs[0].value}`)
                        }
                    })
                }
            }
        }
    }
}
