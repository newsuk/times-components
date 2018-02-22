// @TODO: delete this file when related articles wired up properly
import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as defaultComponents from "./default/responsive";

const templateStyles = {
  defaultComponents
};

export default (template, componentName, config) => {
  const styleTemplateFunction =
    templateStyles[`${template}Components`][`${componentName}`];
  const styleObject = styleTemplateFunction(config);
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
Separator.displayName = "Separator";

export const SliceContainer = withResponsiveStyles(View, {
  mediumUp: () => `
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
  `
});
SliceContainer.displayName = "SliceContainer";
