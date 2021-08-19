# SVGs

This package ensures a consistent API for SVGs that are used across Times
Components. The web version relies on [`svgs`](https://github.com/godaddy/svgs).
The native version provides its own set of components and utilises `ART` from
`react-native`. Components available include `G`, `Path`, `Polygon`, `Rect` and
`Svg`.

## Differences

Opacity behaves differently on native and web SVGs. In web, `fillOpacity` and
`strokeOpacity` are applied separately, but native only has one `opacity` prop
that affects the opacity on both fill colours and stroke colours.

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

## Future

SVGs could use their own showcase.
