import React from "react";
import PropTypes from "prop-types";
import {
  PullQuoteContainer,
  PullQuoteResp
} from "../styles/article-body/responsive";

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

export default PullQuoteWrapper;
