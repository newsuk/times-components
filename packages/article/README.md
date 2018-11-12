# Article

The article component is a composed collection of components and features which go to make up an article. This is distinct from the concept of an article page in the pages package, as that page deals with the data provider, whereas the article component is intended to be a dumb component. It does however compose ads and lazy loading features on web.

Article consumes components such as `ArticleHeader`, `ArticleTopics` and `RelatedArticles`, all of which are related to a specific article. Some of these components are self-contained within the article package itself. Components that are quite large or complex (e.g. related articles), or are used elsewhere (e.g. article label) are separated and put into separate packages.

It takes a Header as a prop so that each template can use the `Article` and provide its own unique spin on it.

These are some of the packages that live within the article package:

### Article Body

The article data which forms the article content comes from an Abstract Syntax
Tree ("AST"). The AST data is managed from within the
[markup package](https://github.com/newsuk/times-components/tree/master/packages/markup),
and article overrides some of this handling with components of its own (e.g.
paragraphs or images).

### Article Topics

A list of topic tags, attached to a particular article, that link to topic
pages.

## Laziness

While Chrome may be bringing lazy loading of images wholesale in the future, for
a cross-browser implementation that allows us more fine grained control over
what we load and how we do it, we can register nodes we're interested in with
the `lazy-load` package.

For `Article` we're interested in images and related articles (for their
images). We use the width of the `Article` for the lead asset which we don't
bother lazy loading (because we always want it) but still get the added benefit
of seeing something much faster on a poor connection. We then don't ask for the
high resolution version of an image in the rest of the body until it comes into
the viewport.

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
