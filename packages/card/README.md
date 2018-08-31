# Card

The card component fades in and lays out content that typically consists of an
image and a collection of textual elements (although this content could be
anything). Card manages the layout of these elements, whilst providing a
consistent loading state for all of the content it is passed. Consumers of card
can also reorder the image and content by reversing the layout order,
effectively swapping over the image and text.

Rendering an image with the card component is optional. A `uri` can be given
with optional `lowResSize` and `highResSize` attributes which may be used to
provide a better experience under certain conditions determined by the `Image`
component.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FCard&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available card templates.
