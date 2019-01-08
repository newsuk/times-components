# Responsive

This package includes utilities for supporting responsive layouts for native
platforms. It provides a wrapper component called <Responsive> which listens to
orientation changes and provides layout information through context named
`ResponsiveContext`. Any child component can then use this layout information by
consuming `ResponsiveContext`.

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
yarn test:android
yarn test:ios
```

Or the tests for all platforms can be run

```
yarn test:all
```
