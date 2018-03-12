import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = withResponsiveStyles(Text, {
  base: () => ` border-top: 1px solid ${colours.functional.keyline};`,
  mediumUp: () => `
    padding-top: ${spacing.default}px;
    padding-bottom: ${spacing.default}px;
  `,
  wideUp: () => `
    line-height: 18px;
    padding-bottom: ${spacing.l}px;
  `
});

export const Meta = withResponsiveStyles(View, {
  base: () => `
    margin-left: ${spacing.default}px;
    margin-right: ${spacing.default}px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `,
  wideUp: () => "padding-top: 0px;"
});
