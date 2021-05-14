import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import type { TestContext as BaseTextContext } from 'ember-test-helpers';
import { hbs } from 'ember-cli-htmlbars';

interface TextContext extends BaseTextContext {
  handler: (event: Event) => void;
}

module('Integration | Modifier | disabled', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  module('if `when` is true', function () {
    test('it sets [aria-disabled]', async function (assert) {
      await render(hbs`<button type='button' {{disabled when=true}}></button>`);

      assert.dom('button').hasAria('disabled', 'true');
    });

    test('it disables button clicks', async function (this: TextContext, assert) {
      assert.expect(0);

      this.handler = () => {
        assert.notOk(true, 'should never get here');
      };

      await render(hbs`
        <div {{on "click" this.handler}}>
          <button type='button' {{disabled when=true}}></button>
        </div>
      `);

      await click('button');
    });
  });

  module('if `when` is `false`', function () {
    test('it does not set [aria-disabled]', async function (assert) {
      await render(hbs`<button {{disabled when=false}}></button>`);

      assert.dom('button').hasAria('disabled', 'false');
    });

    test('it does not disable button clicks', async function (this: TextContext, assert) {
      assert.expect(1);

      this.handler = (event) => {
        event.preventDefault();
        assert.equal(event.target, find('button'));
      };

      await render(hbs`
        <div {{on "click" this.handler}}>
          <button type='button' {{disabled when=false}}></button>
        </div>
      `);

      await click('button');
    });
  });
});
