import React from "react";
import { colours } from "@times-components/ts-styleguide";
import propTypes from "./prop-types";

const ForwardChevron = ({ fillColour, height, width }) => (
  <svg
    aria-label="icon-forward-chevron"
    height={height}
    viewBox="42 12 60 120"
    width={width}
  >
    <g fill={fillColour}>
      <path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
    </g>
  </svg>
);

ForwardChevron.propTypes = propTypes;

ForwardChevron.defaultProps = {
  fillColour: colours.functional.action
};

export default ForwardChevron;
