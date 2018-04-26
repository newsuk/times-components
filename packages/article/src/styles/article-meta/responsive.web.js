import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, spacing } from "@times-components/styleguide";

export const MetaTextElement = withResponsiveStyles(
  Text,
  {
    base: () => ` border-top: 1px solid ${colours.functional.keyline};`,
    mediumUp: () => `
      padding-top: ${spacing(1)};
      padding-bottom: ${spacing(1)};
    `,
    wideUp: () => `
      line-height: 18px;
      padding-bottom: ${spacing(5)};
    `
  },
  "MetaTextElement"
);

export const Meta = withResponsiveStyles(
  View,
  {
    base: () => `
      margin-left: ${spacing(2)};
      margin-right: ${spacing(2)};
    `,
    mediumUp: () => `
      margin-left: 0;
      margin-right: 0;
    `,
    wideUp: () => "padding-top: 0px; margin-bottom: 0"
  },
  "Meta"
);
