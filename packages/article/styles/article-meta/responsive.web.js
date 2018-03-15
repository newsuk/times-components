import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const MetaTextElement = withResponsiveStyles(Text, {
  base: () => ` border-top: 1px solid ${colours.functional.keyline};`,
  mediumUp: () => `
    padding-top: 10px;
    padding-bottom: 10px;
  `,
  wideUp: () => `
    line-height: 18px;
    padding-bottom: 25px;
  `
});

export const Meta = withResponsiveStyles(View, {
  base: () => `
    margin-left: 10px;
    margin-right: 10px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `,
  wideUp: () => "padding-top: 0px; margin-bottom: 0"
});
