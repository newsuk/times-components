import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const KeyFactsResponsiveContainer = withResponsiveStyles(
  View,
  {
    mediumUp: () => `
    flex-direction: row;
  `
  },
  "KeyFactsResponsiveContainer"
);

export default KeyFactsResponsiveContainer;
