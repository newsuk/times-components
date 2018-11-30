import React from "react";
import { Text } from "react-native";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const renderAuthorComponent = (children, key) => ({
  element: (
    <Text key={key} style={styles.nonLinkText}>
      {children}
    </Text>
  )
});

const ArticleByline = ({ ast, isOpinionByline }) => {
  const style = isOpinionByline ? styles.opinion : styles.nonLinkText;
  return renderByline(renderAuthorComponent, ast, style);
};

ArticleByline.displayName = "ArticleByline";

ArticleByline.propTypes = propTypes;
ArticleByline.defaultProps = defaultProps;

export { default as ArticleBylineWithLinks } from "./article-byline-with-links";
export default ArticleByline;
