import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export const KeyFactsResponsiveContainer = withResponsiveStyles(
  View,
  {
    mediumUp: () => `
    flex-direction: row;
    width: 100%;
  `
  },
  "KeyFactsResponsiveContainer"
);

export const KeyFactsResponsiveWrapper = withResponsiveStyles(
  View,
  {
    mediumUp: () => `
    width: 70%;
  `
  },
  "KeyFactsResponsiveWrapper"
);
