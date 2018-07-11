# VideoLabel

VideoLabel is used as a label for any article that utilises video assets. It
displays a video icon, and a given title (or default to "VIDEO").

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
[storybook](http://localhost:9001/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Height%3A%20=288&knob-Width%3A%20=352&knob-Section=%23333333&selectedKind=Primitives%2FVideo%20Label&selectedStory=Video%20Label%20without%20title&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available video label templates.

## Future

When we bump react-native to version 0.55+ we will be able to consolidate the
`beautify-title` methods, because this added support for Android
`letter-spacing`
