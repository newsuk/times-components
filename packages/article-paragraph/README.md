# Article Paragraph

This package provides an article paragraph view, including drop cap support.

Web renders paragraph including all markups. Drop cap is implemented as a
regular children and rendered using CSS floats.

On native, all markups are supported when it's a paragraph without a drop cap.
If there is a drop cap in the children, a special paragraph is rendered to
mimick drop cap layout. This is done by measuring the length of the text and
splitting it into 3 textboxes. Uses a
[3rd party library](https://github.com/aMarCruz/react-native-text-size) to
measure text sizes.

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
yarn test:web
```

Or the tests for all platforms can be run

```
yarn test:all
```

Visit the official

https://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Scale=medium&knob-Section=%23333333&selectedKind=Primitives%2FArticle%20Paragraph&selectedStory=Paragraph&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs

## Future

Planning to support complex markups in the drop cap paragraph text on native.
iOS support for drop caps coming soon.
