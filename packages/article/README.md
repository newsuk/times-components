# Article

The article component is a composed collection of components and features which
go to make up an article. This is distinct from the concept of an article page
in the pages package, as that page deals with the data provider, whereas the
article component is intended to be a dumb component.

Article consumes components such as `ArticleHeader`, `ArticleTopics` and
`RelatedArticles`, all of which are related to a specific article. Some of these
components are self-contained within the article package itself, and some have
been split out into separate packages. Components that are quite large or
complex (e.g. related articles), or are used elsewhere (e.g. article label) are
separated and put into separate packages.

These are some of the packages that live within the article package:

## Article Header & Article Header Label

The intro content at the top of an article.

## Article Meta

The article publication date and byline data.

## Article Lead Asset

Manages the main lead image or video of an article.

## Article Body

The article data which forms the article content comes from an Abstract Syntax
Tree ("AST"). The AST data is managed from within the
[markup package](https://github.com/newsuk/times-components/tree/master/packages/markup),
and article overrides some of this handling with components of its own (e.g.
paragraphs or images).

## Article Topics

A list of topic tags, attached to a particular article, that link to topic
pages.

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
