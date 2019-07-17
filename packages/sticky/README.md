# Sticky

Attach children to viewport on scroll (web only)

This also supports sticking relative to a specified container using the provided
`StickyProvider` component, which renders a chosen element (defaults to a `div`)
to calculate the required offset. This can be useful if you wish to stick the
component below another fixed element.

The package also provides a number of `selectors` for use with styled components
for selectively applying styles in certain conditions.

It also provides `computeProgressStyles`, which is useful if you wish to
to animate a transition between your non-sticky and sticky state as you scroll
through the original component position.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

The code can be formatted and linted in accordance with the agreed standards.

```
yarn fmt
yarn lint
```

## Testing

Testing can be done on each platform individually

```
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
