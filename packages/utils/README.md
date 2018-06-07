# Times Component - Utils

This package contains shared utilities for other packages, such as string utils,
screen size utils, and schema updater.

## Fetching the latest schema

In order to fetch the latest graphql schema, follow these steps:

1. `export GRAPHQL_ENDPOINT=https://api.thetimes.co.uk/graphql` (Omit this step
   to use local server instead)
2. `yarn make-schema`
