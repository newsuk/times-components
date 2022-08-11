# Article Paragraph

This packages provides a component for displaying an article paragraph,
including support for displaying a "drop cap" at the beginning of a paragraph.

The drop cap is implemented using CSS floats, and should work with
any styling or markup used.

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
yarn test:web
```

Visit the official

https://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Scale=medium&knob-Section=%23333333&selectedKind=Primitives%2FArticle%20Paragraph&selectedStory=Paragraph&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs

## Future

The API for this package is likely to change radically in the foreseeable
future. It was written with the intention of supporting arbitrary numbers of
characters being displayed as a drop cap. However, the acceptance criteria for the
feature we use this package for has since changed, and this presents the opportunity for
simplifying the API. **In the future, this package will simply have a toggle for displaying a drop cap,
and will display the first character as a drop cap when it is enabled.**
