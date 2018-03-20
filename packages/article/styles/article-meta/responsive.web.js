import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = withResponsiveStyles(Text, {
  base: () => ` border-top: 1px solid ${colours.functional.keyline};`,
  mediumUp: () => `
    padding-top: ${2 * spacing}px;
    padding-bottom: ${2 * spacing}px;
  `,
  wideUp: () => `
    line-height: 18px;
    padding-bottom: ${5 * spacing}px;
  `
});

export const Meta = withResponsiveStyles(View, {
  base: () => `
    margin-left: ${2 * spacing}px;
    margin-right: ${2 * spacing}px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `,
  wideUp: () => "padding-top: 0px; margin-bottom: 0"
});
