'use strict'

const
    rule = require('../../../lib/rules/no-jquery'),
    RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' } })
ruleTester.run('no-jquery', rule, {

    valid: [{
        code: 'import $ from \'not-a-jquery\''
    }, {
        code: 'this.$something'
    }, {
        code: 'this.$$(\'something\')'
    }],

    invalid: [{
        code: 'import $ from \'jquery\'',
        errors: [{
            message: 'Do not import jQuery, its usage is deprecated.',
            type: 'ImportDeclaration'
        }]
    }, {
        code: 'import jQuery from "jquery"',
        errors: [{
            message: 'Do not import jQuery, its usage is deprecated.',
            type: 'ImportDeclaration'
        }]
    }, {
        code: 'import { whateverHere } from \'jquery\'',
        errors: [{
            message: 'Do not import jQuery, its usage is deprecated.',
            type: 'ImportDeclaration'
        }]
    }, {
        code: 'this.$(\'selector\').eq(0)',
        errors: [{
            message: 'Do not use this.$, its usage is deprecated.',
            type: 'CallExpression'
        }]
    }]
})
