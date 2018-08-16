import React from "react";
import PullQuoteBase from "./pull-quote.base";
import makeTwitterUrl from "./utils";
import { propTypes, defaultProps } from "./pull-quote-prop-types";

const PullQuote = ({ caption, ...props }) => (
  <blockquote url={props.twitter ? makeTwitterUrl(props.twitter) : ""}>
    <PullQuoteBase {...props}>
      <cite>{caption}</cite>
    </PullQuoteBase>
  </blockquote>
);

PullQuote.propTypes = propTypes;
PullQuote.defaultProps = defaultProps;

export default PullQuote;
