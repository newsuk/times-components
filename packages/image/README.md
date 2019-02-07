# Image

The image package maintains two distinct but related components called image and
modalImage. A loading Times placeholder is displayed until the relevant image
has been loaded. If the image never loads (i.e. it errors), the placeholder will
still be visible.

## On web

For web the package is very simple, with the image component serving simple DOM
elements. There is no concept of a modal for web.

## On native

For native a modal can be displayed, which ships with a close button, some
gesture handling, and it also handles given `caption` / `credits` props by
wrapping the image in the caption package component.

The native image manages any malformed `uri` props by adding missing protocols
and managing the width of the image (according to the device width) in the final
query string.

## Android only

Supports offline image support for android only. Creates two image views on top of each other, one for the offline low-res image and another one for the network request with a higher res image.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FImage&selectedStory=Fills%20parent%20width&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available image templates.

## Issues

On Android, SVGs rendered using ART from React Native are disappearing after the
app is moved into the background, and then refocused. This is a known RN issue
which we intend to address shortly, perhaps by moving away from ART. Track the
issue on [JIRA](https://nidigitalsolutions.jira.com/browse/REPLAT-3385).
