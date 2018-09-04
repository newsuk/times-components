# Interactive Wrapper

The editorial team's developers have created a number of Interactive widgets for
the site. These slot in via HTML web components. These are not available on
native.

This component wraps the Interactive allowing it to display as part of the React
article and be available for the first time on Native.

This is a fallback option, with Interactives being written natively in future.

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

Testing can be done on each platform individually

```
yarn test:android
yarn test:ios
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Interactive=chapterHeading&knob-Interactive%20Wrapper=chapterHeading&selectedKind=Primitives%2FInteractive%20Wrapper&selectedStory=Interactive%20Wrapper&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available interactives.
