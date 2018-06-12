import React from "react";
import { Text } from "react-native";
import { getBylineStyles, renderByline } from "./utils";
import { propTypes, defaultProps } from "./article-byline-prop-types";

const renderAuthorComponent = (children, bylineStyles, key) => (
  <Text style={bylineStyles} key={key}>
    {children}
  </Text>
);

const ArticleByline = ({ ast, style, color }) => {
  const bylineStyles = getBylineStyles(style, color);
  return renderByline(renderAuthorComponent, ast, bylineStyles);
};
ArticleByline.displayName = "ArticleByline";

ArticleByline.propTypes = propTypes;
ArticleByline.defaultProps = defaultProps;

export { default as ArticleBylineWithLinks } from "./article-byline-with-links";
export default ArticleByline;
