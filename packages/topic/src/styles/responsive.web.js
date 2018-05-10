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

export const getHeadContainer = ({ hasDescription }) => {
  const HeadContainer = withResponsiveStyles(View, {
    base: () => `
      width: 100%;
      align-items: center;
      flex-direction: column;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      padding-top: ${hasDescription ? spacing(1) : spacing(6)};
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
  });

  HeadContainer.displayName = "HeadContainer";
  return HeadContainer;
};

export const ResponsiveName = withResponsiveStyles(Text, {
  base: () => `
    font-family: ${fonts.headline};
    font-size: ${fontSizes.pageHeadline}px;
    color: ${colours.functional.brandColour};
    padding-bottom: ${spacing(4)};
  `,
  mediumUp: () => `
    font-size: ${fontSizes.pageHeadlineLarge}px;
`
});

ResponsiveName.displayName = "Name";

export const ResponsiveDivider = withResponsiveStyles(View, {
  base: () => `
    border-top-color: ${colours.functional.keyline};
    border-top-style: solid;
    border-top-width: 1px;
    width: 200px;
  `,
  mediumUp: () => `
    width: 290px;
`
});

ResponsiveDivider.displayName = "Divider";
