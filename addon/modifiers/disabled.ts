import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';

// It would be preferable *not* to extend `Record<string, unknown>`  here, but
// it's currently required for assignability reasons: the generics aren't shaped
// correctly to allow named args *without* that extension as the modifier types
// stand. (Technically this is also *true*: callers *can* pass anything they
// want... though that's not really relevant here.)
interface Named extends Record<string, unknown> {
  /** Flag for when to show  */
  when: boolean;
}

/**
 *
 * @param element Any interactive element.
 * @param _ positional params (none)
 * @param named named args: when to accessible disable the element.
 */
export default modifier(
  (element: Element, _: never[], { when: isDisabled }: Named) => {
    assert(
      'a11y-disabled: disabled modifier requires boolean `when` argument',
      typeof isDisabled === 'boolean'
    );

    element.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');

    if (isDisabled) {
      const stopEvent = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };

      element.addEventListener('click', stopEvent);
      return () => element.removeEventListener('click', stopEvent);
    }

    // No teardown necessary in this case!
    return;
  }
);
