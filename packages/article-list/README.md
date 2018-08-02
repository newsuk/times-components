# Article List

This represents a paginated list of articles. These articles typically appear on
a page, associated to a particular author or topic. An article list is composed
of many other packages such as card, article summary and link. These components
are primarily used for the layout of the individual article items themselves.

## Infinite Scrolling

Whilst the web flavour of article list utilises the pagination package, the
native version contains its own brand of pagination in the form of infinite
scrolling. This utilises the react-native `FlatList` and the GraphQL `fetchMore`
method to show more articles when a user has scrolled to the bottom of the
article list.

## Error Handling

The error view package utilises the React `componentDidCatch` lifecycle event to
create an
[`ErrorBoundary`](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
which handles errors within the article list. This ensures any failing articles
do not show in the list, but the list will still show with the page count
unchanged.

## Lazy Loading

Currently, the web version of article list incorporates lazy loading of images
within article list. This is implemented with
[`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

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
features, and not just available for list pages. A package like
[`react-virtualized`](https://github.com/bvaughn/react-virtualized) could be
utilised in the future.
