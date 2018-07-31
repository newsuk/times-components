# Article

The article component is a composed collection of components and features which
go to make up an article. This is distinct from the concept of an article page
in the pages package, as that page deals with the data provider, whereas this
package is intended to be a dumb component.

The Article component consumes components such as `ArticleHeader`,
`ArticleTopics` and `RelatedArticles`, all of which are related to a specific
article. Some of these components are self-contained with the article package
itself, and some have been split out into separate packages (see the Future
section below). The article data which forms the article content comes from an
Abstract Syntax Tree ("AST"). It is this AST, handled in the markup package (see
the
[markup README](https://github.com/newsuk/times-components/tree/master/packages/markup)
for a full description), that forms the majority of the content within the
article itself.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Pages%2FArticle&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article templates.

## Future

We plan on adopting a better and more well-defined approach as to which
components belong in the article package and which ones should be split out. At
the moment, this feels fairly arbitrary.

Also, a better error component design will be adopted going forward.
