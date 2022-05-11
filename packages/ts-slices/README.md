# Typescript Components

This package contains components written in a *Typescript*. This will allow for
easy migration when we need to move these to a more modern repository.

## Build

All the build steps have been updated to handle all the build steps:

1. `yarn transpile` will build javascript into the `/dist` directory
1. `yarn lint` will perform `tslint` and `prettier` tasks
1. `yarn bundle` will generate the `rnw.js` (react-native-web) bundle

## Storybook

For now, you will need to do a `yarn build` for storybook to update.

