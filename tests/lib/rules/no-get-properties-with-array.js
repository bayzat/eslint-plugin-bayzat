'use strict'

const
    rule = require('../../../lib/rules/no-get-properties-with-array'),
    RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })
ruleTester.run('no-get-properties-with-array', rule, {

    valid: [{
        code: 'getProperties(object, \'prop1\', \'prop2\')'
    }, {
        code: 'object.getProperties(\'prop1\', \'prop2\')'
    }],

    invalid: [{
        code: 'getProperties(object, [\'prop1\', \'prop2\'])',
        errors: [{
            message: 'Use getProperties without an array with properties.',
            type: 'CallExpression'
        }],
        output: 'getProperties(object, \'prop1\', \'prop2\')'
    }, {
        code: 'this.getProperties([\'prop1\', \'prop2\'])',
        errors: [{
            message: 'Use getProperties without an array with properties.',
            type: 'CallExpression'
        }],
        output: 'this.getProperties(\'prop1\', \'prop2\')'
    }, {
        code: 'this.getProperties([ \'prop1\', \'prop2\' ])',
        errors: [{
            message: 'Use getProperties without an array with properties.',
            type: 'CallExpression'
        }],
        output: 'this.getProperties(\'prop1\', \'prop2\')'
    }, {
        code: `
this.getProperties([
    'prop1',
    'prop2'
])`,
        errors: [{
            message: 'Use getProperties without an array with properties.',
            type: 'CallExpression'
        }],
        output: `
this.getProperties(
    'prop1',
    'prop2'
)`
    }]
})
