# KeyFacts

An unordered list of textual content, Key Facts are used at the top or bottom of
an article, appearing with indented bullet points and an optional title. The
data is derived from an (Abstract Syntax Tree) AST, comprised of nodes that
dictate text, links and styled elements.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Key%20facts%20title%3A%20=New%20Brexit%20referendum&selectedKind=Composed%2FKey%20Facts&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available key facts templates.
