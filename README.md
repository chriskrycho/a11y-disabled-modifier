a11y-disabled-modifier
==============================================================================

Implement accessible and usable button-disabling (inspired by [this fantastic post on CSS Tricks](https://css-tricks.com/making-disabled-buttons-more-inclusive/)) with a modifier:

```hbs
<form {{on "submit" this.submit}}>
  <label>some text: <input type='text' /></label>
  <button type='submit' {{disabled when=this.isInvalid}}>submit</button>
</form>
```

When the modifier is enabled with the required `when` named argument:

- the target element has `aria-disabled="true"`
- clicks on the button do not propagate
- form submission does not trigger


## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v12 or above

### TypeScript

This project follows the current draft of [the Semantic Versioning for TypeScript Types][semver] pro
posal.

- **Currently supported TypeScript versions:** v4.1 and v4.2
- **Compiler support policy:** [simple majors][sm]
- **Public API:** all published types not in a `-private` module are public

[semver]: https://github.com/chriskrycho/ember-rfcs/blob/semver-for-ts/text/0730-semver-for-ts.md
[sm]: https://github.com/chriskrycho/ember-rfcs/blob/semver-for-ts/text/0730-semver-for-ts.md#simple
-majors

**Note:** for the moment, the types provided here are basically inert. Glint users can see the implementation for types to use there.


## Installation

```
ember install a11y-disabled-modifier
```


## Usage

Use this modifier in place of the `disabled` attribute, which causes a variety of usability problems, when you *absolutely must* disable a button programmatically. ***Most of the time, you shouldn't use this at all: prefer to provide feedback on form submission instead!***

For custom styling for disabled elements, you can use the `[aria-disabled="true"]` and `[aria-disabled="false"]` selectors. This guarantees that your styles will stay in sync with the runtime behavior of the app:

```css
.my-button {
  /* default styles... */
}

.my-button[aria-disabled="true"] {
  cursor: not-allowed;
}
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
