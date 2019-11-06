/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import ArticleParagraph from "./article-paragraph";

const ArticleParagraphWrapper = ({ ast, children, uid, height, style }) => {
  const { children: astChildren } = ast;
  if (!astChildren || astChildren.length === 0) {
    return null;
  }

  return (
    <ArticleParagraph
      height={height}
      key={`paragraph-${uid}`}
      testID={`paragraph-${uid}`}
      style={style}
    >
      {children}
    </ArticleParagraph>
  );
};

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  uid: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.objectOf({})
};

ArticleParagraphWrapper.defaultProps = {
  style: {}
};

export default ArticleParagraphWrapper;
