import { Text, View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

export const KeyFactsResponsiveContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    margin: 5px 10px;
  `,
    mediumUp: () => `
    flex-direction: row;
    margin: 10px auto;
    width: ${config.mediumBpWidth};
  `,
    wideUp: () => `
    width: ${config.wideBpWidth};
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
