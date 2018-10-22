# Article Paragraph

This packages provides a component for displaying an article paragraph
on android and web, including support for displaying a "drop
cap" at the beginning of a paragraph.

On the web, the drop cap is implemented using CSS floats, and should work with
any styling or markup used.

React Native does not support CSS floats. Therefore, on android,
the drop cap is implemented by rendering three separate text boxes to
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

## Gotchas

To implement this on Android, we must know the number of words that can fit
next to the specified drop cap character, and then split the paragraph text at
this point. Because of this, all styling or markup must be stripped.
**This means on Android, you cannot have styling or markup in a paragraph containing a drop cap.**

We use a [3rd party library](https://github.com/aMarCruz/react-native-text-size)
to calculate the text to fit next to the drop cap. There is currently limited support for iOS
from this library. **Therefore, this package
does not currently have support for iOS.**

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

The API for this package is likely to change radically in the foreseeable
future. It was written with the intention of supporting arbitrary numbers of
characters being displayed as a drop cap. However, the acceptance criteria for the
feature we use this package for has since changed, and this presents the opportunity for
simplifying the API. **In the future, this package will simply have a toggle for displaying a drop cap,
and will display the first character as a drop cap when it is enabled.**

We would like to support paragraph styling on Android when drop caps are enabled,
but this is tricky and therefore it may take some time before support is
implemented.

We intend to add iOS support to this package.
