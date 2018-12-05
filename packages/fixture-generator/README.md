# FixtureGenerator

This package is meant to create a single testable location for our fixtures. Enabling us to generate fixture data using schema introspection and graphql gen that is typesafe and reliable.

The aim for this package is to give us a single location for integration tests, showcase and UI tests all to use.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

This project is in typescript so you've got that do deal with. The reason for which is so we can enforce the types that we generate from graphql gen.

In order to build the project just run:

```
yarn transpile
```

You do not need to have typescript on your machine as we install the compiler as a dev dependency.

## Testing
