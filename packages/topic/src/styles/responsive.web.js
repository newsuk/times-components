import { Text, View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const getHeadContainer = ({ hasDescription }) =>
  withResponsiveStyles(
    View,
    {
      base: () => `
      width: 100%;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      padding-bottom: ${hasDescription ? spacing(4) : 0};
    `,
      mediumUp: () => `
      padding-left: 0;
      padding-right: 0;
      max-width: ${config.mediumBpWidth};
      padding-top: ${hasDescription ? spacing(1) : spacing(6)};
      padding-bottom: ${hasDescription ? spacing(7) : spacing(2)};
    `,
      wideUp: () => ` 
      max-width: ${config.wideBpWidth};
      padding-top: ${hasDescription ? spacing(3) : spacing(10)};
      padding-bottom: ${hasDescription ? spacing(8) : spacing(3)};
    `
    },
    "HeadContainer"
  );

export const ResponsiveName = withResponsiveStyles(
  Text,
  {
    base: () => `
    font-family: ${fonts.headline};
    font-size: ${fontSizes.pageHeadline}px;
    color: ${colours.functional.brandColour};
    padding-bottom: ${spacing(4)};
    text-align: center;
  `,
    mediumUp: () => `
    font-size: ${fontSizes.pageHeadlineLarge}px;
`
  },
  "Name"
);

export const ResponsiveDivider = withResponsiveStyles(
  View,
  {
    base: () => `
    border-top-color: ${colours.functional.keyline};
    border-top-style: solid;
    border-top-width: 1px;
    margin: ${spacing(4)} auto;
    width: 200px;
  `,
    mediumUp: () => `
    width: 290px;
`
  },
  "Divider"
);
