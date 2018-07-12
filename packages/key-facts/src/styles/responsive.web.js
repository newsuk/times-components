import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const KeyFactsResponsiveContainer = withResponsiveStyles(
  View,
  {
    mediumUp: () => `
    flex-direction: row;
    flex-wrap: wrap;
  `
  },
  "KeyFactsResponsiveContainer"
);

export default KeyFactsResponsiveContainer;
