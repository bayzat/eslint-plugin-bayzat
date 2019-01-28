# disallow usage of Ember\'s getProperties() with an array of properties (no-get-properties-with-array)

It's preferred to use getProperties with a list of properties instead of providing them in an array. This rule helps to identify and fix such usage.

## Rule Details

This rule disallow usage of Ember\'s getProperties() with an array of properties.

Examples of **incorrect** code for this rule:

```js
/*eslint no-get-properties-with-array: "error"*/

const { prop1, prop2 } = getProperties(object, ['prop1', 'prop2'])
const { prop1, prop2 } = object.getProperties([ 'prop1', 'prop2' ])
```

Examples of **correct** code for this rule:

```js
/*eslint no-get-properties-with-array: "error"*/

const { prop1, prop2 } = getProperties(object, 'prop1', 'prop2')
const { prop1, prop2 } = object.getProperties('prop1', 'prop2')
```
