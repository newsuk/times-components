import React from "react";
import { Text } from "react-native";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const renderAuthorComponent = (children, key, attributes, { className }) => ({
  element: (
    <Text className={className} key={key} style={styles.opinion}>
      {children}
    </Text>
  )
});

const ArticleBylineOpinion = ({ ast, ...props }) =>
  renderByline(renderAuthorComponent, ast, styles.opinion, props);

ArticleBylineOpinion.displayName = "ArticleBylineOpinion";

ArticleBylineOpinion.propTypes = propTypes;
ArticleBylineOpinion.defaultProps = defaultProps;

export default ArticleBylineOpinion;
