import React from "react";
import { Text } from "react-native";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const renderAuthorComponent = (children, key, attributes, { className }) => ({
  element: (
    <Text className={className} key={key} style={styles.nonLinkText}>
      {children}
    </Text>
  )
});

const ArticleByline = ({ ast, ...props }) =>
  renderByline(renderAuthorComponent, ast, styles.nonLinkText, props);

ArticleByline.displayName = "ArticleByline";

ArticleByline.propTypes = propTypes;
ArticleByline.defaultProps = defaultProps;

export { default as ArticleBylineOpinion } from "./article-byline-opinion";
export { default as ArticleBylineWithLinks } from "./article-byline-with-links";
export default ArticleByline;
