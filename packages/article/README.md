# Article

Article essentially represents an article page and all of the components and
features found therein. This package is comprised of numerous other components
and packages, such as `ArticleHeader`, `ArticleTopics` and `RelatedArticles`,
all of which are related to a specific article. Some of the components utilised
in the package are self-contained with the article package itself, and some have
been split out into separate pacakges. The article data which forms the article
content comes from an Abstract Syntax Tree ("AST"). It is this AST, handled in
the markup package, that forms the majority of the content within the article
itself.

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
