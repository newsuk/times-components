# Star Button

A star button component which is clickable and exposes three states: `initial`, `selected`, `disabled`

- `StarButton` - wraps any star svg and is clicable. Can be disabled.
- `starStates` - enum for the button states.

## How to use

```js
import StarButton, { starStates } from "@times-components/star-button";

// works this way
<StarButton onPress={this.onStarPress} starState={starState} />

```

`starState` prop controls the state of the star. It changes colours and opacity based on the different state.
`Diabled` would not allow the star to be clicked.

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
[storybook](http://components.thetimes.co.uk)
to see our available link templates.
