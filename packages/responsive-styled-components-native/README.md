# Responsive Styled Components Native

This package allows you to create responsive styled components when using
styled components native. It is designed to work with both React Native and React
Native Web.

Usage is very similar to styled components, except we provide a
mediaQuery tag which is similar to the CSS tag styled-components provides.

```js
import { View } from "react-native";
import responsiveStyled, {
  mediaQuery
} from "@times-components/responsive-styled-components-native";

const ResponsiveView = responsiveStyled(View)`
    ${mediaQuery(screenWidth => screenWidth > 100)`
      /* styles here will only be applied on screens wider than 100px
      background-color: blue;
    `}
`;
```

We also provide `responsiveStyled.View` and `responsiveStyled.Text` to avoid needing
to import React Native just to wrap these components.

As well as being able to pass custom matcher functions to `mediaQuery`, we also
provide pre-defined matchers for `minWidth` and `maxWidth`, and predefined matchers
for all of the breakpoints defined in `@times-components/styleguide`.

```js
mediaQuery.minWidth(
  400
)`/* styles only apply when screen is equal to or wider than 400px`;
mediaQuery.maxWidth(
  400
)`/* styles only apply when screen is equal to or less wide than 400px`;

mediaQuery.maxWidth
  .medium`/* styles only apply on the medium breakpoint or less wide */`;
mediaQuery.minWidth
  .small`/* styles only apply on the small breakpoint or wider */`;
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

## Link to Render project

```
yarn watch
```

To link the package to render project run `yarn watch`, make some code change and restart the server

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
