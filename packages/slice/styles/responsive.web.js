import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

// @TODO: use template to pull these in
export const SliceContainer = withResponsiveStyles(View, {
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `,
  mediumUp: () => `
    flex-direction: row;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    width: ${mediumBpWidth};
  `,
  wideUp: () => `
    width: ${wideBpWidth};
  `
});

export const ChildContainer = withResponsiveStyles(View, {
  base: () => `
    flex-grow: 1;
  `,
  mediumUp: () => `
    flex-basis: 0 !important;
    padding-left: 15px;
  `
});
