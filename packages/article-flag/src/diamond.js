import React from "react";
import PropTypes from "prop-types";

import Svg, { G, Path } from "svgs";

const Diamond = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="0 0 20 20">
    <G fill={color}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

Diamond.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export default Diamond;
