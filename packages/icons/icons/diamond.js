import React from "react";
import PropTypes from "prop-types";

import Svg, { G, Path } from "svgs";

const IconDiamond = ({ width, height, fillColour }) => (
  <Svg width={width} height={height} viewBox="0 0 20 20">
    <G fill={fillColour}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

IconDiamond.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fillColour: PropTypes.string.isRequired
};

export default IconDiamond;
