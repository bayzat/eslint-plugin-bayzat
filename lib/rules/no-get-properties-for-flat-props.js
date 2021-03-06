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

                if (!((node.init.callee.type === 'Identifier' && node.init.callee.name === 'getProperties') // getProperties(subject, …)
                    || (node.init.callee.type === 'MemberExpression'
                        && (node.init.callee.object.type === 'ThisExpression' // this.getProperties(…)
                            || node.init.callee.object.type === 'Identifier' // subject.getProperties(…)
                            || node.init.callee.object.type === 'MemberExpression' // this.subject.getProperties(…)
                        )
                        && node.init.callee.property.type === 'Identifier'
                        && node.init.callee.property.name === 'getProperties'
                    ))
                ) {
                    return
                }

                const
                    propNamesLeftSide = node.id.properties.map(({ key }) => {
                        return key.name || key.value
                    }).sort(),
                    propNamesRightSide = node.init.arguments.filter((argument) => {
                        return argument.type === 'Literal'
                    }).map(({ value }) => {
                        return value
                    }).sort()

                if (propNamesLeftSide.length !== propNamesRightSide.length) {
                    return
                }

                for (let i = 0; i < propNamesLeftSide.length; i += 1) {
                    const
                        propNameLeftSide = propNamesLeftSide[i],
                        propNameRightSide = propNamesRightSide[i]

                    if (propNameLeftSide !== propNameRightSide || propNameLeftSide.indexOf('.') !== -1) {
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
                                const sourceCode = context.getSourceCode()
                                return fixer.replaceText(node.init, sourceCode.getText(node.init.callee.object))
                            }
                        }
                    }
                })
            }
        }
    }
}
