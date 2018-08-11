import React from "react";
import PQ from "./pull-quote.base";
import { propTypes, defaultProps } from "./pull-quote-prop-types";

const PullQuote = ({ caption, ...props }) => <PQ {...props}>{caption}</PQ>;

PullQuote.propTypes = propTypes;
PullQuote.defaultProps = defaultProps;

export default PullQuote;
