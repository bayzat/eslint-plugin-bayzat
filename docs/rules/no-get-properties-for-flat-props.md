# disallow usage of Ember\'s getProperties() in case destructuring can be used (no-get-properties-for-flat-props)

In Ember 3.x it's possible to access properties directly on the object and thanks to destructuring it's possible to replace some usages of getProperties. This rule helps to identify usage which can be converted to direct access. Only for in variable declarations and for properties which are not nested.

## Rule Details

This rule disallows usage Ember's getProperties() in case destructuring can be used.

Examples of **incorrect** code for this rule:

```js
/*eslint no-get-properties-for-flat-props: "error"*/

const { prop1, prop2 } = getProperties(object, 'prop1', 'prop2')
const { prop1, prop2 } = object.getProperties('prop1', 'prop2')
```

Examples of **correct** code for this rule:

```js
/*eslint no-get-properties-for-flat-props: "error"*/

const { prop1, prop2 } = getProperties(object, 'nested.prop1', 'prop2')
const { prop1, prop2 } = object.getProperties('prop1', 'nested.prop2')
```
