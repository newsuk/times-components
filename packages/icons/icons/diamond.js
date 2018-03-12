import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { G, Path } from "svgs";
import iconPropTypes from "./proptypes";

const IconDiamond = ({ width, height, fillColour }) => (
  <Svg width={width || height} height={height} viewBox="0 0 20 20">
    <G fill={fillColour}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

IconDiamond.propTypes = iconPropTypes;

IconDiamond.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconDiamond;
