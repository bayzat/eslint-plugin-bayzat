'use strict'

const
    rule = require('../../../lib/rules/no-get-for-flat-props'),
    RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()
ruleTester.run('no-get-for-flat-props', rule, {

    valid: [{
        code: 'get()'
    }, {
        code: 'get(object, propertyVar)'
    }, {
        code: 'get(\'something\')'
    }, {
        code: 'get(\'something\', \'anything\')'
    }, {
        code: 'get(object, \'nested.prop.erty\')'
    }, {
        code: 'this.get()'
    }, {
        code: 'this.get(object, propertyVar)'
    }, {
        code: 'this.get(\'something\', \'anything\')'
    }, {
        code: 'this.get(\'nested.prop.erty\')'
    }, {
        code: 'get(object, \'long-dashed-property\')'
    }, {
        code: 'this.get(\'long-dashed-property\')'
    }],

    invalid: [{
        code: 'get(object, \'property\')',
        errors: [{
            message: 'Property property can be access directly.',
            type: 'CallExpression'
        }],
        output: 'object.property'
    }, {
        code: 'this.get(\'property\')',
        errors: [{
            message: 'Property property can be access directly.',
            type: 'CallExpression'
        }],
        output: 'this.property'
    }]
})
