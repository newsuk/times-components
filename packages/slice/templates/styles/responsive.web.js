import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

export const SliceContainer = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    flex: 1;
    justify-content: center;
  `
});
SliceContainer.displayName = "SliceContainer";

export const getSeparator = ({ hasLeftRightMargin, itemCount }) => {
  const Separator = withResponsiveStyles(View, {
    base: () => `
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: ${colours.functional.keyline};
      flex: 1;
      margin-bottom: ${itemCount >= 3 ? "15px" : "10px"};
      margin-top: 15px;
      min-width: auto;
    `,
    mediumUp: () => `
      border-bottom: none;  
      border-right-style: solid;
      border-right-width: 1px;
      border-right-color: ${colours.functional.keyline};
      flex: 0 !important;
      margin: ${hasLeftRightMargin ? "0 10px" : "0"};
    `
  });
  Separator.displayName = "Separator";
  return Separator;
};
