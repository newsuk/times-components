import React from "react";
import PropTypes from "prop-types";

import Svg, { G, Path } from "svgs";

const IconChevronLeft = ({ width, height, fillColour }) => (
  <Svg width={width} height={height} viewBox="42 12 60 120">
    <G fill={fillColour}>
      <Path d="M98.2,12l3.8,3.8L69.2,72,102,128.2,98.2,132,42,72Z" />
    </G>
  </Svg>
);

IconChevronLeft.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fillColour: PropTypes.string.isRequired
};

export default IconChevronLeft;
