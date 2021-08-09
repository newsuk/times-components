# Gradient

The gradient component wraps any children and adds a gradient background. The
gradient's angle can be configured by the consumer of gradient. There are two
exported components:

- `Gradient` - used for image placeholders and loading screens
- `OverlayGradient` - developed for use when overlaying text over parts of an
  image

## How to use

```js
import Gradient, { OverlayGradient } from "@times-components/gradient";

// Works on it's own
<Gradient
  degrees={90}
  style={{
    width: 200,
    height: 200
  }}>
</Gradient>

// Works with children
<OverlayGradient
  degrees={90}
  style={{
    width: 200,
    height: 200
  }}>
  <Text>Example text</Text>
</OverlayGradient>
```

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FGradient&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available gradient templates.
