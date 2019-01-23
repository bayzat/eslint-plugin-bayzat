# disallow usage of jQuery in Ember projects (no-jquery)

Ember is trying to decouple from jQuery and official guides for testing already use the direct dom access, this rule helps identify where jQuery is still used in tests.

## Rule Details

This rule disallows usage of jQuery in Ember projects.

Examples of **incorrect** code for this rule:

```js
/*eslint no-jquery: "error"*/

import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import $ from 'jquery'

module('Integration | Component | random component', function(hooks) {
    setupRenderingTest(hooks)

    test('it renders', async function(assert) {
        await render(hbs`{{random-component}}`)
        assert.equal($(this.element).text().trim(), 'random link')
        assert.equal(this.$('a').text().trim(), 'link')
    })

})
```

Examples of **correct** code for this rule:

```js
/*eslint no-jquery: "error"*/

import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | random component', function(hooks) {
    setupRenderingTest(hooks)

    test('it renders', async function(assert) {
        await render(hbs`{{random-component}}`)
        assert.equal(this.element.textContent.trim(), 'random link')
        assert.equal(this.element.querySelector('a').textContent.trim(), 'link')
    })

})
```
