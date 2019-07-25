import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";
import { renderAst } from "./article-summary";
import styles from "./styles";

const placeholder800Characters =
  "Britain needs to build a fleet of nuclear or carbon-capture power plants equivalent to a dozen Hinkley Point Cs to hit climate change targets, a leaked government analysis suggests.Up to 40 gigawatts of non-intermittent low carbon power stations could be needed in 2050 to reduce Britain’s emissions. Britain needs to build a fleet of nuclear or carbon-capture power plants equivalent to a dozen Hinkley Point Cs to hit climate change targets, a leaked government analysis suggests.Up to 40 gigawatts of non-intermittent low carbon power stations could be needed in 2050 to reduce Britain’s emissions. Britain needs to build a fleet of nuclear or carbon-capture power plants equivalent to a dozen Hinkley Point Cs to hit climate change targets, a leaked government analysis suggests. Up to 40 gigawatts";
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
      {whiteSpaceHeight !== undefined
        ? placeholder800Characters
        : renderAst(ast)}
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
