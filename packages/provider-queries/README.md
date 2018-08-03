# Provider Queries

The home for all GraphQL queries to be shared by Times Components. Having them
in once place makes it easier to share them around and keep specific linting
rules in one place

## How to use

Simply import a query which is produced with
[graphql-tag](https://github.com/apollographql/graphql-tag). Typically you would
pass this into an Apollo GraphQL HOC such as `connect` from the `provider`
package. They can also be used for testing and generating fixtures.

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
