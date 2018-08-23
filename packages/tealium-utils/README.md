# Tealium Utils

Like the tealium package, this package is web-only. Mobile tracking is managed
natively. This package simply sets up a "dev" instance of the Tealium reporter
for usage in the Times Components showcases. Showcases typically import this
method and pass it to any component that utilises the tracking package.

```
import storybookReporter from "@times-components/tealium-utils";

...
<MyTrackedComponent analyticsStream={storybookReporter} />
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
yarn test:all
yarn test:android
yarn test:ios
yarn test:web
```
