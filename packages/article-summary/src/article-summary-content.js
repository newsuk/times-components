import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";
import { renderAst } from "./article-summary";
import styles from "./styles";

const ArticleSummaryContent = ({
  ast,
  className,
  style,
  whiteSpaceHeight,
  initialLines = 2
}) => {
  const lineHeight = (style && style.lineHeight) || styles.text.lineHeight;
  const numberOfLinesToRender =
    whiteSpaceHeight > 0
      ? whiteSpaceHeight / lineHeight + initialLines
      : initialLines;

  const numberOfLinesProp = whiteSpaceHeight !== undefined && {
    numberOfLines: numberOfLinesToRender
  };

  return ast.length > 0 ? (
    <TcText
      className={className}
      style={checkStylesForUnits({ ...styles.text, ...style })}
      {...numberOfLinesProp}
    >
      {renderAst(ast)}
    </TcText>
  ) : null;
};

ArticleSummaryContent.propTypes = {
  ast: PropTypes.arrayOf(treePropType),
  className: PropTypes.string,
  style: {}
};

ArticleSummaryContent.defaultProps = {
  ast: [],
  className: "",
  style: null
};

export default ArticleSummaryContent;
