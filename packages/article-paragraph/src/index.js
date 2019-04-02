/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import ArticleParagraph from "./article-paragraph";
import {
  propTypes as dropCapPropTypes,
  defaultProps as dropCapDefaultProps
} from "./drop-cap-prop-types";

const ArticleParagraphWrapper = ({
  ast,
  children,
  uid
}) => {
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
  children: PropTypes.node.isRequired,
  dropCapColour: dropCapPropTypes.colour,
  dropCapFont: dropCapPropTypes.font,
  uid: PropTypes.number.isRequired
};

ArticleParagraphWrapper.defaultProps = {
  dropCapColour: dropCapDefaultProps.dropCapColour,
  dropCapFont: dropCapDefaultProps.font
};

export default ArticleParagraphWrapper;
