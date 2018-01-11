import React from "react";
import PropTypes from "prop-types";
import ArticleRowBase from "./article-body-row.base";

import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
} from "./styles/body/responsive";

const imageWrapperFunction = imageType => {
  switch (imageType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    default:
      return PrimaryImg;
  }
};

const PullQuoteWrapper = ({ children }) => (
  <PullQuoteContainer>
    <PullQuoteResp>{children}</PullQuoteResp>
  </PullQuoteContainer>
);

PullQuoteWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

const ArticleRow = props => (
  <ArticleRowBase
    {...props}
    imageWrapperFunction={imageWrapperFunction}
    PullQuoteWrapper={PullQuoteWrapper}
  />
);

export default ArticleRow;
