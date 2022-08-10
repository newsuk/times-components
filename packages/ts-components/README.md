# Typescript Components

This package contains components written in a *Typescript*. This will allow for
easy migration when we need to move these to a more modern repository.
# Article Flag
Article flags are attached to an article like a label to indicate the article's
status. Common statuses are exported as components from this package, although both the original and "live news" flags have a `title` prop to enable a bespoke status.

The original article flags are styled with a circular bullet in front of the title, coloured text and no background colour. They include the "new", "updated", "exclusive", "sponsored" and "long read" flags. The "live news" flags, which include "live" and "breaking", are styled to have a diamond icon in front of the title and white text on a coloured background.

The flags are currently added to an article by an editor using the CMS. These
flags "expire" server side.
## Build

All the build steps have been updated to handle all the build steps:

1. `yarn transpile` will build javascript into the `/dist` directory
1. `yarn lint` will perform `tslint` and `prettier` tasks
1. `yarn bundle` will generate the `rnw.js` bundle

## Storybook

For now, you will need to do a `yarn build` for storybook to update, or you could run `yarn watch:build` to update storybook on save

