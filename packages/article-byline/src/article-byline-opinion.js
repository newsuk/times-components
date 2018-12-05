import React from "react";
import { Text } from "react-native";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const renderAuthorComponent = (children, key) => ({
  element: (
    <Text key={key} style={styles.opinion}>
      {children}
    </Text>
  )
});

const ArticleBylineOpinion = ({ ast }) =>
  renderByline(renderAuthorComponent, ast, styles.opinion);

ArticleBylineOpinion.displayName = "ArticleBylineOpinion";

ArticleBylineOpinion.propTypes = propTypes;
ArticleBylineOpinion.defaultProps = defaultProps;

export default ArticleBylineOpinion;
