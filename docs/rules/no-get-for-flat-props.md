# disallow usage of Ember's get() to access flat property (no-get-for-flat-props)

In Ember 3.x it's possible to access properties directly on the object. This rule helps to identify usage which can be converted to direct access. Only for properties which are not nested.

## Rule Details

This rule disallows usage Ember's get() to access flat property.

Examples of **incorrect** code for this rule:

```js
/*eslint no-get-for-flat-props: "error"*/

get(object, 'property')
object.get('property')
```

Examples of **correct** code for this rule:

```js
/*eslint no-get-for-flat-props: "error"*/

const value = object.property

// also accepted because it's not possible to transform nested props
get(object, 'nested.prop.erty')
object.get('nested.prop.erty')

// also accepted to avoid complex fix function
get(object, 'long-dashed-property')
object.get('long-dashed-property')
```

**Note: there is an assumption that `get` function is always imported from `@ember/object`**
**Note: after applying this rule with `--fix` the file can end up being invalid because of unused import of `get`; to avoid introduction of complexity into the rule, this has to be fixed manually**
