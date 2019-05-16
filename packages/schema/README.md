# Schema

The GraphQL schema that is generated from our GraphQL endpoint is used primarily
for two cases, linting and helping out Apollo with a
[fragment matcher](https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher).

This package auto-generates the `schema.json` necessary for linting at install
time (provided you set the `GRAPHQL_ENDPOINT` envar) and also the
`fragmentMatcher`. By inlining it we can statically bundle the minimal amount of
code for the Apollo Client to be happy, with no runtime overhead.

We do this at `install` time in order to fail the builds as soon as there's a
mismatch with our server side implementation.

## Usage

Everything should be generated at `install` time but you can regenerate by
running something like:

```bash
GRAPHQL_ENDPOINT='my.endpoint.io/graphql' yarn postinstall
```

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
