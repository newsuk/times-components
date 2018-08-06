# Article Summary

An article summary contains optional information about an article such as
headline, summary, publication date, author and label. Some of these components
are passed in as render props, and others are passed in as a config object,
either containing props to be passed on to the appropriate component, or an
Abstract Syntax Tree ("AST") which a component can handle by itself.

## Components with a render prop

* headline - `ArticleSummaryHeadline` lays out an accessible article headline
* content - `ArticleSummaryContent` handles an AST, but is passed into the
  summary as a render prop

## Components with a config object of props

* date publication - article summary wraps the `DatePublication` component and
  simply passes on the date props it receives
* label - article summary passes label props onto either `ArticleLabel` or
  `VideoLabel`

## Components with an AST

* byline - passes the given AST to `ArticleByline` or `ArticleBylineWithLinks`

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FArticle%20Summary&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article summary templates.
