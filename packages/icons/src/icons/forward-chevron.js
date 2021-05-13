import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { G, Path } from "@times-components/svgs";
import propTypes from "./prop-types";

const ForwardChevron = ({ fillColour, height, width }) => (
  <Svg
    aria-label="icon-forward-chevron"
    height={height}
    viewBox="42 12 60 120"
    width={width}
  >
    <G fill={fillColour}>
      <Path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
    </G>
  </Svg>
);

ForwardChevron.propTypes = propTypes;

ForwardChevron.defaultProps = {
  fillColour: colours.functional.action
};

export default ForwardChevron;
