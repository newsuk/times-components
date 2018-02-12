import { Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

export default withResponsiveStyles(Text, {
  base: () => `
    font-size: 22px;
    line-height: 25px;
    margin-bottom: 5px;
    margin-top: 0;
  `,
  mediumUp: () => `
    font-size: 30px;
    line-height: 33px;
  `
});
