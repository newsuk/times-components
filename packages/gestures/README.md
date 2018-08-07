# Gestures

Gestures is a native wrapper that allows touch gestures on mobile of its child
components. Gestures supports two finger zoom and rotate, in either direction,
and also allows components to return to their original position when fingers are
removed.

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

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests on each
platform with [jest](https://facebook.github.io/jest/).

```
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```

Gestures can be viewed locally using `yarn storybook-native` in the "Helpers"
section.
