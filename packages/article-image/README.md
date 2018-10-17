# Article Image

Article content often includes images which are defined in the article image
package. Article images are configured to be one of several different types
which dictates the general layout, particularly in relation to their
accompanying caption.

- primary - main image of the article, running full width
- secondary - any secondary article image, generally half width, with captions
  next to the image
- inline - images that allow content to wrap around them

Ratio configuration controls the size of the image, and whether it is portrait
or landscape.

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
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FArticle%20Image&selectedStory=Primary&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article image templates.
