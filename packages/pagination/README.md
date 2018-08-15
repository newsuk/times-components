# Pagination

The pagination package provides a pagination user interface (UI) and pagination
state Higher Order Component (HOC). These two exports are both required for
pagination to work. This package is currently only used by article list pages
(author profile and topics) for the web.

## UI

The `<Pagination />` component provides a pagination UI for web. The user can
see what page they are on, and can navigate to other pages with the next and
previous buttons. This UI component ships with its own tracking handling.

## State management with a HOC

`withPageState` is a HOC pagination helper that manages the state of the
pagination. It maintains what page the user is currently on. Typically this is
passed a component that consumes the `Pagination` component itself.

### Usage

```
withPageState(authorProfileTrackingContext(AuthorProfile));
```

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Composed%2FPagination&selectedStory=First%20page&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available pagination templates.
