# Pages

This component combines dumb components with their respective providers to
create smart components, to be ready to use by native apps and web.

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) before contributing to this
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
```

## Future

For now, the pages are only being used by native apps, but going forward, they
should also be consumable by web.
