import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = withResponsiveStyles(Text, {
  base: () => ` border-top: 1px solid ${colours.functional.keyline};`,
  mediumUp: () => `
    padding-top: ${spacing.standard}px;
    padding-bottom: ${spacing.standard}px;
  `,
  wideUp: () => `
    line-height: 18px;
    padding-bottom: ${spacing.stackStandard}px;
  `
});

export const Meta = withResponsiveStyles(View, {
  base: () => `
    margin-left: ${spacing.standard}px;
    margin-right: ${spacing.standard}px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `,
  wideUp: () => "padding-top: 0px;"
});
