# SSR

An unpublished package which allows developers to easily play with
server-side-rendering (SSR). Add any "pages" (top level components) here for
rendering, by adding a route and the webpack config necessary to create a client
bundle.

## Usage

Before each command below you should set the envar `GRAPHQL_ENDPOINT` which will
be used for data fetching. In order to create a bundle it relies on each package
having it's own `rnw` bundle generated. Use `npx lerna run bundle` at the root
to simulate a published package.

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
warnings/errors. The server-side response is also compressed for testing client
perf.

```bash
yarn start
```

Run a simple node server which serves up the various pages which currently
include:

- `/article/:article-id`
- `/profile/:author-slug`
- `/topic/:topic-slug`

They will use the client side bundle you generated above. You can optionally set
`AUTH_TOKEN` as an envar (instructions should be available from your API
provider) to get unteased articles.

```bash
yarn bundle:profile
```

This will generate the webpack `stats.json` file in `dist`. You can then use a
command such as `npx webpack-bundle-analyzer stats.json` in the `dist` folder to
visualise the webpack bundle or upload it to other tools
[suggested by webpack](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

```bash
yarn start:tpamock
```

This starts an [Apollo sever](https://www.apollographql.com/docs/apollo-server/)
with a mock implementation using the fixture generator from `provider-test-tools`.
This should be expanded on to provide different use cases for particular queries
and used for testing with Cypress so that we have a closely integration
"fixture server" for robust e2e testing.

```bash
yarn start:test
```

Simply starts the SSR server but sets the `GRAPHQL_ENDPOINT` to port 4000 which
is where the mock TPA server should be running using `yarn start:tpamock`.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing to this
package

## Running the code

Please see our main [README.md](../README.md) to get the project running locally

## Development

The code can be formatted and linted in accordance with the agreed standards.

```bash
yarn fmt
yarn lint
```

## Testing

As the future of the website, we want to improve the end-to-end testing DX which
[Cypress](https://www.cypress.io/) may help us with. There is currently a very
simple implementation which could be developed to the point where editorial content
is developed with a TDD approach here, that just happens to use components in the monorepo.

Currently there is one simple test that is run separately in CI with no coverage measured.

The tests can be developed as follows:

```bash
yarn start:tpamock
yarn start:test
npx cypress open
```

you can then use the Cypress GUI to develop your tests.

For CI or to check you haven't broke anything there is:

```bash
yarn test:integration
```

This will create a dev client side bundle with the mock `GRAPHQL_ENDPOINT`,
start up the mock server and SSR, run the Cypress tests inside electron and
then shutdown the servers.

## Future

- Publish : potentially we want to look at using this as our source of truth for
  server-side rendering, this would mean exporting and publishing the code to be
  used by render, so it's "all the same code"

- Bundle Size: we bundle packages on CI in master, we could then bundle here and
  lint for excessively sized bundles

- Testing: flesh out the mock server to auto-generate several scenarios for e2e
  testing and add more Cypress tests to move away from render specific and/or
  Java tests
