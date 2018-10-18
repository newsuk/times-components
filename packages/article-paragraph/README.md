# Article Paragraph

This package provides an article paragraph view, including support for
displaying a "drop cap" at the beginning of the paragraph.

On the web, the drop cap is implemented using CSS floats, and should work with
any styling or markup used.

On native, the drop cap is implemented by rendering three separate text boxes to
mimic the expected layout, as shown below.

```
 __________________________________________________________
|     _     | Lorem ipsum dolor sit amet, consectetur      |
|    / \    | adipiscing elit. Vivamus imperdiet dapibus   |
|   / _ \   | justo, non varius turpis ornare at. Sed nec  |
|  / ___ \  | tellus sit amet sapien pretium efficitur sit |
| /_/   \_\ | amet et mi. Mauris vel lorem erat. Proin     |
|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
| pulvinar eros purus, nec lobortis purus mollis viverra.  |
| Nullam tristique id ligula eget ornare. Curabitur vitae  |
| erat quam. Vivamus rutrum arcu enim, eu cursus nunc      |
| congue faucibus. Proin lacinia facilisis auctor.         |
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

To implement this, we must know the number of words that can fit next to the
specified drop cap character, and then split the paragraph text at this point.
Because of this, all styling or markup must be stripped. This means on native,
you cannot have styling or markup in a paragraph containing a drop cap.

We use a [3rd party library](https://github.com/aMarCruz/react-native-text-size)
to calculate the text to fit next to the drop cap.

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
