'use strict'

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow usage of Ember\'s getProperties() in case destructuring can be used',
            recommended: true
        },
        fixable: 'code',
        schema: [], // no options
        messages: {
            unexpectedGetPropertiesCall: 'Use of getProperties can be replaced by destructuring.'
        }
    },
    create: function(context) {
        return {
            VariableDeclarator(node) {
                if (node.id.type !== 'ObjectPattern' || node.init.type !== 'CallExpression') {
                    return
                }

                if (!((node.init.callee.type === 'Identifier' && node.init.callee.name === 'getProperties')
                    || (node.init.callee.type === 'MemberExpression'
                        && (node.init.callee.object.type === 'ThisExpression' || node.init.callee.object.type === 'Identifier')
                        && node.init.callee.property.type === 'Identifier'
                        && node.init.callee.property.name === 'getProperties'
                    ))
                ) {
                    return
                }

                const
                    propNamesLeftSide = node.id.properties.map(({ key }) => {
                        return key.name
                    }).sort(),
                    propNamesRightSide = node.init.arguments.filter((argument) => {
                        return argument.type === 'Literal'
                    }).map(({ value }) => {
                        return value
                    }).sort()

                if (propNamesLeftSide.length !== propNamesRightSide.length) {
                    return
                }

                for (let i = 0; i <= propNamesLeftSide.length; i += 1) {
                    if (propNamesLeftSide[i] !== propNamesRightSide[i]) {
                        return
                    }
                }

                context.report({
                    node: node,
                    messageId: 'unexpectedGetPropertiesCall',
                    fix: (fixer) => {
                        if (node.init.callee.type === 'Identifier') {
                            return fixer.replaceText(node.init, node.init.arguments[0].name)
                        } else if (node.init.callee.type === 'MemberExpression') {
                            if (node.init.callee.object.type === 'ThisExpression') {
                                return fixer.replaceText(node.init, 'this')
                            } else {
                                return fixer.replaceText(node.init, node.init.callee.object.name)
                            }
                        }
                    }
                })
            }
        }
    }
}
