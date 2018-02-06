import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import * as relatedArticlesDefaultStyles from "./related-articles.default.web.js";

const templateStyles = {
  relatedArticlesDefaultStyles
};

export default (template, componentName) => {
  const stylesObjectName = `${template.domain}${template.type}Styles`;
  const componentStylesName = `${componentName}Styles`;
  const styleObject = templateStyles[stylesObjectName][componentStylesName];
  return withResponsiveStyles(View, styleObject);
};
