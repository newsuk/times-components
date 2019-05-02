/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import ArticleParagraph from "./article-paragraph";

const ArticleParagraphWrapper = ({ ast, children, uid }) => {
  const { children: astChildren } = ast;
  if (!astChildren || astChildren.length === 0) {
    return null;
  }

  return (
    <ArticleParagraph key={`paragraph-${uid}`} testID={`paragraph-${uid}`}>
      {children}
    </ArticleParagraph>
  );
};

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]).isRequired,
  uid: PropTypes.number.isRequired
};

export default ArticleParagraphWrapper;
