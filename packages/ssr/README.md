# SSR

An unpublished package which allows developers to easily play with
server-side-rendering (SSR). Add any "pages" (top level components) here for
rendering, by adding a route and the webpack config necessary to create a client
bundle.

## Usage

Before each command below you should set the envar `GRAPHQL_ENDPOINT` which will
be used for data fetching

```bash
yarn bundle:dev
```

Create a client-side dev bundle to hydrate the SSR page, useful for checking
developer level warnings which you may need to fix

```bash
yarn bundle:prod
```

Create a client-side prod bundle to hydrate the SSR page, this will have the
various optimisations applied with code splitting and silence any console
warnings/errors

```bash
yarn start
```

Run a simple node server which serves up the various pages which currently
include:

* /profile/:author-slug
* /topic/:topic-slug

They will use the client side bundle you generated above

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

## Future

Potentially we want to look at using this as our source of truth for server-side
rendering, this would mean exporting and publishing the code to be used by
render, so it's "all the same code"

We should also add the article page and fix the ad config
