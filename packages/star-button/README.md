# Star Button

A star button component which is clickable and has three states: `default`, `selected`, `disabled`

- `StarButton` - wraps a star svg and is clicable.

## How to use

```js
import StarButton from "@times-components/star-button";

// works this way
<StarButton onPress={this.onStarPress} />;
<StarButton onPress={this.onStarPress} disabled={true} />;
<StarButton onPress={this.onStarPress} selected={true} />;
```

It changes colours and opacity based on the different state it has.
`default` star is clickable and has default colour.
`disabled` does not allow the star to be clicked.
`selected` would change the star colour.

If `disabled` and `selected` are both true - `disabled` takes precedence.

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
