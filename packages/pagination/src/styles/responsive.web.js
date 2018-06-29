import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

export const ResponsiveControlWrapper = withResponsiveStyles(
  View,
  {
    base: () => `
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
    `,
    mediumUp: () => `
      padding-left: 0;
      padding-right: 0;
    `
  },
  "ResponsiveControlWrapper"
);
