import React from "react";
import PullQuoteBase from "./pull-quote.base";
import { propTypes, defaultProps } from "./pull-quote-prop-types";

const PullQuote = ({ children, ...props }) => (
  <PullQuoteBase {...props}>{children}</PullQuoteBase>
);

PullQuote.propTypes = propTypes;
PullQuote.defaultProps = defaultProps;

export default PullQuote;
