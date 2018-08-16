import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";
import { renderAst } from "./article-summary";
import styles from "./styles";

const ArticleSummaryContent = ({ ast, className }) =>
  ast.length > 0 ? (
    <Text className={className} style={styles.text}>
      {renderAst(ast)}
    </Text>
  ) : null;

ArticleSummaryContent.propTypes = {
  ast: PropTypes.arrayOf(treePropType),
  className: PropTypes.string
};

ArticleSummaryContent.defaultProps = {
  ast: [],
  className: ""
};

export default ArticleSummaryContent;
