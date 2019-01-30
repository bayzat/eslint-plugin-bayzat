# disallow usage of Ember\'s getProperties() in case destructuring can be used (no-get-properties-for-flat-props)

In Ember 3.x it's possible to access properties directly on the object and thanks to destructuring it's possible to replace some usages of getProperties. This rule helps to identify usage which can be converted to direct access. Only for in variable declarations and for properties which are not nested.

## Rule Details

This rule disallows usage Ember's getProperties() in case destructuring can be used.

Examples of **incorrect** code for this rule:

```js
/*eslint no-get-properties-for-flat-props: "error"*/

const { prop1, prop2 } = getProperties(object, 'prop1', 'prop2')
const { prop1, prop2 } = object.getProperties('prop1', 'prop2')
const { prop1, prop2 } = this.getProperties('prop1', 'prop2')
```

Examples of **correct** code for this rule:

```js
/*eslint no-get-properties-for-flat-props: "error"*/

const { prop1, prop2 } = object
const { prop1, prop2 } = this

// also accepted because it's not possible to transform nested props
const { 'nested.prop1': nestedProp1, prop2 } = getProperties(object, 'nested.prop1', 'prop2')
const { prop1, 'nested.prop2': nestedProp2 } = object.getProperties('prop1', 'nested.prop2')
```

**Note: there is an assumption that `getProperties` function is always imported from `@ember/object`**
**Note: after applying this rule with `--fix` the file can end up being invalid because of unused import of `getProperties`; to avoid introduction of complexity into the rule, this has to be fixed manually**
**Note: this rule cannot be applied in case your code uses Ember Data or Ember proxies as they require usage of `getProperties`**
