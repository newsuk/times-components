import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

import * as defaultStylesObject from "./responsive.default.web.js";

const templateStyles = {
  defaultStylesObject
};

export default (template, componentName) => {
  const stylesObjectName = `${template.toLowerCase()}StylesObject`;
  const componentStylesName = `${componentName}Styles`;
  const styleObject = templateStyles[stylesObjectName][componentStylesName];
  return withResponsiveStyles(View, styleObject);
};
