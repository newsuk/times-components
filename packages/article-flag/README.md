# Article Flag

Article flags are attached to an article like a label to indicate the article's
status. There are some common statuses that are exported as components from this
package, such as "new", "updated", "exclusive" or "sponsored", but the default
component also takes a bespoke `title` prop to enable a bespoke status.

The flags are currently added to an article by an editor using the CMS. These
flags "expire" server side.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FArticle%20Flag&selectedStory=Article%20Flag%20%28Default%29&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article flag templates.
