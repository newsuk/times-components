# Pull Quote

Cited content is shown within an article using the pull quote package. This
simple package show a textual quote on the page, and is mostly configured with
the colours that comprise its elements. The pull quote takes required `content`,
which is the quote itself, and two optional strings called `caption` and
`twitter`, which are typically used to attriute the citation (or quote) to a
person, including their (optional) twitter handle.

The colour props `captionColour` and `quoteColour` handle the colour of the
`caption` text and the colour of the quotation marks, respectively.

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
[storybook](http://components.thetimes.co.uk/?knob-Size%20of%20ad%20placeholder%3A=default&knob-Caption%3A%20=Judge%20Sapnara&knob-Caption%20Colour%3A%20=%23850029&knob-Content%3A%20=%5BThe%20judgement%20was%5D%20taken%20because%20of%20the%20evidence%20available%20in%20the%20court%20today%2C%20that%20the%20grandmother%20is%20an%20appropriate%20carer%20for%20the%20child&knob-Quote%20Colour%3A%20=%23850029&knob-Twitter%20Link%3A%20=%40henrywinter&selectedKind=Primitives%2FPull%20Quotes&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)
to see our available pull quote templates.
