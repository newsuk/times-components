import { View } from "react-native";
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
