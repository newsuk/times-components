# Article List

This represents a paginated list of articles. These articles typically appear on
a page, associated to a particular author or topic. An article list is composed
of many other packages such as card, article summary and link. These components
are primarily used for the layout of the individual article items themselves.

## Infinite Scrolling

Article list utilises the pagination package for this.

## Error Handling

The error view package utilises the React `componentDidCatch` lifecycle event to
create an
[`ErrorBoundary`](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
which handles errors within the article list. This ensures any failing articles
do not show in the list, but the list will still show with the page count
unchanged.

## Lazy Loading

The `lazy-load` package is used to lazy load images to improve the feeling of a
fast page load. Low resolution images are first rendered and then high
resolution images are progressively layered on. On browsers that support
`IntersectionObserver` the higher resolution images will only be pulled in as
they come into the viewport saving bandwidth and mobile resources.

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

This package uses [yarn](https://yarnpkg.com) (latest) to run unit tests with [jest](https://facebook.github.io/jest/).

```
yarn test:web
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FArticle%20List&selectedStory=Default%20with%20images&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available article list templates.
