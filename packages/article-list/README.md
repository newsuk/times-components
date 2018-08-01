# Article List

This represents a paginated list of articles. These articles typically appear on
a page, associated to a particular author or topic. An article list is composed
of many other packages such as card, article summary and link. These components
are primarily used for the layout of the individual article items themselves.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FArticle%20List&selectedStory=Default%20with%20images&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article list templates.

## Future

Inifinite scroll pagination is baked into this package for the native
experience. We are planning to fish this out into the pagination package in the
future.

Lazy loading for the web is baked into this package at the moment. We intend to
move this into its own package so it can be reusable across other pages and
features, and not just available for list pages.
