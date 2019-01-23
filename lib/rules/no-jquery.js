'use strict'

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow usage of jQuery in Ember projects',
            recommended: true
        },
        fixable: null,
        schema: [], // no options
        messages: {
            unexpectedImport: 'Do not import jQuery, its usage is deprecated.',
            unexpectedCall: 'Do not use this.$, its usage is deprecated.'
        }
    },
    create: function(context) {
        return {
            ImportDeclaration(node) {
                const importSource = node.source.value.trim()

                if (importSource === 'jquery') {
                    context.report({
                        node: node,
                        messageId: 'unexpectedImport'
                    })
                }
            },

            CallExpression(node) {
                const { callee } = node

                if (callee.type === 'MemberExpression' && callee.object.type === 'ThisExpression'
                    && callee.property.name === '$'
                ) {
                    context.report({
                        node: node,
                        messageId: 'unexpectedCall'
                    })
                }
            }
        }
    }
}
