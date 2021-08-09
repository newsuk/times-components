# Styleguide

The styleguide package contains the shared styles and functionalities which are
commonly used across Times Components packages and components. Many of the
properties of the styleguide can be simply exported as named exports:

```
import { colours, spacing } from "@times-components/styleguide";
```

However, the default export is a factory method which takes a configuration
object.

## Configuration

The styleguide default method can be called much like a factory funtion with a
config object. This object includes a scale property which manages the
user-controlled font size settings:

```
import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide({ scale });
```

## Animations

A cross-device component called `FadeIn` which animates a fade in

## Colours

Exports functional or section based colours.

## Fonts

Times Components fonts and font sizes.

## Font factory

The `fontFactory` method takes a `font` and `fontSize`, and returns an object
containing the appropriate font style properties, including a `lineHeight`.

## Line heights

Times Componets line heights. This is utilised as part of the font factory
scaling.

## Spacing

Provides a way to standardise layout, particularly in regards to the concept of
a consistent spacing layout across multiple breakpoints.

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
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Helpers%2FStyleguide&selectedStory=Functional%20Colours&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available styleguide templates.
