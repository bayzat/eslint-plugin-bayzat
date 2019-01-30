'use strict'

const
    rule = require('../../../lib/rules/no-get-properties-for-flat-props'),
    RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })
ruleTester.run('no-get-properties-for-flat-props', rule, {

    valid: [{
        code: 'const { prop1, prop3 } = getProperties(object, \'prop1\', \'prop2\')'
    }, {
        code: 'const { prop1, prop2, prop3 } = getProperties(object, \'prop1\', \'prop2\')'
    }, {
        code: 'const { prop1 } = this.getProperties()'
    }, {
        code: 'const props = this.getProperties(\'prop1\', \'prop2\')'
    }, {
        code: 'const { \'order.id\': orderId, prop2 } = getProperties(object, \'order.id\', \'prop2\')'
    }],

    invalid: [{
        code: 'const { prop1, prop2 } = getProperties(object, \'prop1\', \'prop2\')',
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: 'const { prop1, prop2 } = object'
    }, {
        code: 'const { prop1, prop2 } = this.getProperties(\'prop1\', \'prop2\')',
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: 'const { prop1, prop2 } = this'
    }, {
        code: 'const { \'dashed-prop1\': dashedProp1, \'dashed-prop2\': dashedProp2 } = this.getProperties(\'dashed-prop1\', \'dashed-prop2\')',
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: 'const { \'dashed-prop1\': dashedProp1, \'dashed-prop2\': dashedProp2 } = this'
    }, {
        code: 'const { prop1, prop2 } = object.getProperties(\'prop1\', \'prop2\')',
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: 'const { prop1, prop2 } = object'
    }, {
        code: 'const { prop1, prop2 } = this.object.getProperties(\'prop1\', \'prop2\')',
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: 'const { prop1, prop2 } = this.object'
    }, {
        code: `
const {
    prop1,
    prop2
} = this.getProperties('prop1', 'prop2'),
{
    prop4,
    prop3
} = object.getProperties('prop3', 'prop4'),
{ prop5: prop7, prop6 } = getProperties(anotherObject,
    'prop5',
    'prop6'
)`,
        errors: [{
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }, {
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }, {
            message: 'Use of getProperties can be replaced by destructuring.',
            type: 'VariableDeclarator'
        }],
        output: `
const {
    prop1,
    prop2
} = this,
{
    prop4,
    prop3
} = object,
{ prop5: prop7, prop6 } = anotherObject`
    }]
})
