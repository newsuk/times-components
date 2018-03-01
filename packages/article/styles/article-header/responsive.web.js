import { View, Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const HeadlineContainer = withResponsiveStyles(Text, {
  base: () => `
    font-size: ${fontSizes.biggestHeadline}px;
    color: ${colours.functional.brandColour};
    margin-bottom: 8px;
    font-family: "${fonts.headline}";
    font-weight: 400;
    line-height: 30px;
  `,
  mediumUp: () => `
    font-size: ${fontSizes.hugestHeadline}px;
    line-height: 45px;
  `
});

export const LabelContainer = withResponsiveStyles(View, {
  wideUp: () => "margin-top: 0px;"
});
