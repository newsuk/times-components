# Theme

Provides theming capabilities by utilising React's Context API.

This package should be used to create themes to be shared between multiple
components, such as app-wide font size changes that defines the scale of the
text views.

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) before contributing to this
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
yarn test:android
yarn test:ios
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

## Future

More theme properties will be added in the future, such as the section colours,
that will be defined by the apps' current navigation state.
