import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";
import { renderAst } from "./article-summary";
import styles from "./styles";

const initialLines = 2;

const ArticleSummaryContent = ({ ast, className, style, whiteSpaceHeight }) => {
  const lineHeight = (style && style.lineHeight) || styles.text.lineHeight;
  const numberOfLinesToRender =
    whiteSpaceHeight > 0
      ? whiteSpaceHeight / lineHeight + initialLines
      : initialLines;

  const numberOfLinesProp = whiteSpaceHeight !== undefined && {
    numberOfLines: numberOfLinesToRender
  };

  return ast.length > 0 ? (
    <Text
      className={className}
      style={[styles.text, style]}
      {...numberOfLinesProp}
    >
      {renderAst(ast)}
    </Text>
  ) : null;
};

ArticleSummaryContent.propTypes = {
  ast: PropTypes.arrayOf(treePropType),
  className: PropTypes.string,
  style: PropTypes.shape({})
};

ArticleSummaryContent.defaultProps = {
  ast: [],
  className: "",
  style: null
};

export default ArticleSummaryContent;
