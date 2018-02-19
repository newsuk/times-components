import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as defaultComponents from "./default/responsive";
import * as leadComponents from "./lead/responsive";

const templateStyles = {
  defaultComponents,
  leadComponents
};

export default (renderedComponent, template, componentName, config) => {
  const styleTemplateFunction =
    templateStyles[`${template}Components`][`${componentName}`];
  const styleObject = styleTemplateFunction(config);
  return withResponsiveStyles(renderedComponent, styleObject);
};

export const Heading = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: #dbdbdb;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: #dbdbdb;
    border-top-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    height: 55px;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `
});
