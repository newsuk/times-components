import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as defaultStyles from "./default/responsive";

const templateStyles = {
  defaultStyles
};

export default (template, componentName, childCount) => {
  const stylesObjectName = `${template}Styles`;
  const componentStylesName = `${componentName}Styles`;
  const styleObject = templateStyles[stylesObjectName][componentStylesName];
  const obj = styleObject(childCount);
  return withResponsiveStyles(View, obj);
};
