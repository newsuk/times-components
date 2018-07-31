# Article Byline

An article byline is a piece of styled text that consists of an author, or list
of authors, either with, or without author job titles and locations. This data
typically derives from an Abstract Syntax Tree ("AST"), with the resulting
components being passed to article byline as `children`. The consumer of article
byline determines whether the byline should be a link or text, and will import
the appropriate byline component as neccessary.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FArticle%20Byline&selectedStory=Article%20Byline%20with%20a%20single%20author&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article byline templates, or see the article byline with
links
[templates](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FArticle%20Byline%20With%20Links&selectedStory=Article%20Byline%20with%20a%20single%20author&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs).
