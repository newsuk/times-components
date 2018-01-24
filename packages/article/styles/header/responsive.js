import { View, Text } from "react-native";
import { Colours } from "@times-components/styleguide";
import withResponsiveStyles from "@times-components/responsive-styles";

export const HeadlineContainer = withResponsiveStyles(Text, {
  base: () => `
    font-size: 30px;
    color: ${Colours.timesBlack};
    margin-bottom: 8px;
    font-family: "TimesModern-Bold";
    font-weight: 400;
    line-height: 30px;
  `,
  mediumUp: () => `
    font-size: 45px;
    line-height: 45px;
  `
});

export const LabelContainer = withResponsiveStyles(View, {
  wideUp: () => "margin-top: 0px;"
});
