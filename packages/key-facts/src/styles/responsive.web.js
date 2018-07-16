import { Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

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
    width: 80%;
  `
  },
  "KeyFactsResponsiveWrapper"
);

export const KeyFactsTitleResponsive = withResponsiveStyles(
  Text,
  {
    mediumUp: () => `
    padding-right: ${spacing(4)};
    width: 20%;
  `
  },
  "KeyFactsTitleResponsive"
);
