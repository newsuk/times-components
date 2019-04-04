# TextFlow

![Class Diagram](classes.svg)

TextFlow is a package for easily doing text heavy layouts on platforms that don't have a typesetting engine (like React Native). It allows you to flow text around block elements, measure text sizing without platform support and fit text into arbitary shapes. It also has markup support for styling such as different fonts, weights, kerning, tracking and colours.

## Usage
### Measuring Text
```javascript
import { Text as FlowText, Markup } from "text-flow"

const text = new FlowText.Text({
    font: 'TimesModern-Regular',
    size: 18,
    lineHeight: 30,
    markup: [new Markup.MarkupString("Hello World!")]
});

const width = text.measuredWidth
const Height = text.measuredHeight
```
Make sure you set the same font, size and line-height as what you will be rendering the text with.

### Getting the layout of a paragraphs
```javascript
import { Text as FlowText, Layout, Markup } from "text-flow"

const textStyle = {
    font: 'TimesModern-Regular',
    size: 18,
    lineHeight: 30
}

const flow = new Layout.TextFlow({
    width: 660,
    flow: [
        // First Paragraph
        new FlowText.Text({
            ...textStyle,
            markup: [new Markup.MarkupString("<SOME PARAGRAPH>")]
        }),
        // Second Paragraph
        new FlowText.Text({
            ...textStyle,
            markup: [new Markup.MarkupString("<SOME OTHER PARAGRAPH>")]
        })
    ]
})
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

<!-- Add the storybook link here. -->

## Future

<!-- Add details of future development here. -->
