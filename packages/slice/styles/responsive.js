import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

export const MainContainer = withResponsiveStyles(View, {
  base: () => `
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => `
    padding-left: 0;
    padding-right: 0;
  `
});

export const SubContainer = withResponsiveStyles(View, {
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
