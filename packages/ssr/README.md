# SSR

The renderer used to render top level components server side and to create client
bundles. Add any "pages" (top level components) here for rendering, by adding a
route and the webpack config necessary to create a client bundle.

## Usage

In order to create a bundle, we need for all packages to have their own `rnw` bundle.
Use `npx lerna run bundle` at the root to simulate a published package.

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
GRAPHQL_ENDPOINT=<API endpoint> SPOT_ID=<SpotIM ID> yarn start
```

Run a simple node server which serves up the various pages which currently
include:

- `/article/:article-id`
- `/profile/:author-slug`
- `/topic/:topic-slug`

They will use the client side bundle you generated above.

- `GRAPHQL_ENDPOINT` is used for data fetching.
- `SPOT_ID` is used to render comments on article pages.
- You can optionally set `GRAPHQL_TOKEN` (instructions should be available from your
  API provider) to get unteased articles.

```bash
yarn bundle:profile
```

This will generate the webpack `stats.json` file in `dist`. You can then use a
command such as `npx webpack-bundle-analyzer stats.json` in the `dist` folder to
visualise the webpack bundle or upload it to other tools
[suggested by webpack](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

```bash
yarn start:testserver
```

Simply starts the SSR server but sets the `SPOT_ID` to a fixed dummy value (so
the SpotIM script will written on the article page, but not found/run), and sets
`GRAPHQL_ENDPOINT` to port 4000 which is where the test TPA server should be running.
This is a test

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
yarn start:testservers
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
