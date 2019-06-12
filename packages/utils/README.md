# Utils

This package contains shared utilities for other packages, such as string utils,
screen size utils, and schema updater.

## Fetching the latest schema

In order to fetch the latest graphql schema, follow these steps:

1. `export GRAPHQL_ENDPOINT=https://api.thetimes.co.uk/graphql` (Omit this step
   to use local server instead)
2. `yarn make-schema`

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
yarn test
```

## Future

Some of the test specific utilities should be moved to the test-utils package.
