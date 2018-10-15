# Article Paragraph

This package provides a paragraph starting with a drop cap letter.

In native, this is done by measuring the length of the text and splitting it
into 3 textboxes. Uses a
[3rd party library](https://github.com/aMarCruz/react-native-text-size) to
measure text sizes.

On the web, this is done by using CSS floats.

Currently, this component only supports plain text paragraphs, so any text given
should have the markups stripped.

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

https://components.thetimes.co.uk/?knob-Lead%20Asset=true&knob-Size%20of%20ad%20placeholder%3A=default&knob-GraphQL%C2%A0Endpoint=&knob-Video=true&knob-Section=%23333333&knob-Flags=true&knob-Standfirst=true&knob-Scale=medium&knob-Linked%20Byline=true&knob-Article%20id=&knob-Label=true&selectedKind=Composed%2FDropCap&selectedStory=DropCap&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs

## Future

Planning to support complex markups in the paragraph text. iOS support coming
soon.
