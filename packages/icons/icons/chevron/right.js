import React from "react";
import PropTypes from "prop-types";

import Svg, { G, Path } from "svgs";

const IconChevronRight = ({ width, height, fillColour }) => (
  <Svg width={width} height={height} viewBox="42 12 60 120">
    <G fill={fillColour}>
      <Path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
    </G>
  </Svg>
);

IconChevronRight.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fillColour: PropTypes.string.isRequired
};

export default IconChevronRight;
