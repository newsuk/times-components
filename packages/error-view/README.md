# Error View

The error view package is a React
[Error Boundary](https://reactjs.org/docs/error-boundaries.html). From the React
documentation itself:

> Error boundaries are React components that catch JavaScript errors anywhere in
> their child component tree, log those errors, and display a fallback UI
> instead of the component tree that crashed. Error boundaries catch errors
> during rendering, in lifecycle methods, and in constructors of the whole tree
> below them.

This package provides an `ErrorView` wrapper component that takes a render prop
as a direct child of the component. This function returns three possible values
which can be used to handle the enclosed child components:

- `error` - the error that was returned
- `hasError` - boolean, did the component error
- `onError` - a function that handles errors and triggers the error view
  components error handling

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&selectedKind=Primitives%2FError%20View&selectedStory=handles%20a%20component%20that%20errors&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available error view templates.
