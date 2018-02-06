import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

export default withResponsiveStyles(View, {
  mediumUp: () => `
    width: ${mediumBpWidth};
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  `,
  wideUp: () => `
    width: ${wideBpWidth};
  `
});
