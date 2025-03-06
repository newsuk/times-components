# Slice layout

Slice layouts are re-usable templates. A slice layout lays itself out according to a
set of self-defined rules. The slice layout also provides a suggested default
configuration that can be applied to the given components that are to be laid
out within the template - this configuration is provided in the form of CSS
class names and JS objects. The consumer of
slice layout can opt-in or out of utilising these suggested default configurations

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

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests with [jest](https://facebook.github.io/jest/).

```
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?selectedKind=Primitives%2FSlice&selectedStory=Default%20template%20with%20one%20item&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available slice layout templates.

## Future

Template creation could be done using a CLI to create default files in the
accepted architectural format
