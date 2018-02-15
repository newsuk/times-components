import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as defaultStyles from "./default/responsive";

const templateStyles = {
  defaultStyles
};

export default (template, componentName) => {
  const stylesObjectName = `${template}Styles`;
  const componentStylesName = `${componentName}Styles`;
  const styleObject = templateStyles[stylesObjectName][componentStylesName];
  return withResponsiveStyles(View, styleObject);
};
