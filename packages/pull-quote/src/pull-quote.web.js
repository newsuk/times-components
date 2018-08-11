import React from "react";
import PQ from "./pull-quote.base";
import makeTwitterUrl from "./utils";
import { propTypes, defaultProps } from "./pull-quote-prop-types";

const PullQuote = ({ caption, ...props }) => (
  <blockquote url={props.twitter ? makeTwitterUrl(props.twitter) : ""}>
    <PQ {...props}>
      <cite>{caption}</cite>
    </PQ>
  </blockquote>
);

PullQuote.propTypes = propTypes;
PullQuote.defaultProps = defaultProps;

export default PullQuote;
