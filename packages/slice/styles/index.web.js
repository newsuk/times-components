import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as defaultStyles from "./default/responsive";

const templateStyles = {
  defaultStyles
};

export default (template, componentName, childCount) => {
  const styleTemplateFunction =
    templateStyles[`${template}Styles`][`${componentName}Styles`];
  const styleObject = styleTemplateFunction(childCount);
  return withResponsiveStyles(View, styleObject);
};

export const Separator = withResponsiveStyles(View, {
  base: () => `
      display: none;
    `,
  mediumUp: () => `
      border-right-style: solid;
      border-right-width: 1px;
      border-right-color: #dbdbdb;
      display: block;
      flex: 0 !important;
      margin-left: 10px;
      margin-right: 10px;
      min-height: auto;
    `
});

export const SliceContainer = withResponsiveStyles(View, {
  mediumUp: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    padding-bottom: 10px;
    padding-top: 10px;
  `
});
