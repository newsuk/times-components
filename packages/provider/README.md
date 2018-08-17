# Provider

The provider package manages the connections to [GraphQL](https://graphql.org/)
(GQL). At a fundamental level, the package simply exports providers that take
GQL queries (from the provider queries package), and use
[React Apollo](https://github.com/apollographql/react-apollo) to fetch data from
the GQL server. These providers can be configured to take a `debounceTimeMs`
prop which adds debounce functionality to the provider calls to ensure better
performance and user experience.

This package is where we intend to add all future functionalities and features
that fix any issues, or fill any gaps, we find in the React Apollo API.

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
[storybook](http://components.thetimes.co.uk/?selectedKind=Primitives%2FSlice&selectedStory=Default%20template%20with%20one%20item&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available provider templates.

## Future

We currently use an older version of the React Apollo API. We are planning on
updating our usage of this package to use the newer
[`Query` component](https://www.apollographql.com/docs/react/essentials/queries.html#basic).
[See this issue](https://github.com/newsuk/times-components/issues/1225).
