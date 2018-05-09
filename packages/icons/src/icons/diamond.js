import React from "react";
import { colours } from "@times-components/styleguide";
import { clean } from "@times-components/utils";
import Svg, { G, Path } from "@times-components/svgs";
import iconPropTypes from "./prop-types";

const IconDiamond = ({ title, width, height, fillColour, strokeColour }) => (
  <Svg
    viewBox="0 0 20 20"
    {...clean({ title, height, width: width || height })}
  >
    <G {...clean({ fill: fillColour, stroke: strokeColour })}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

IconDiamond.propTypes = iconPropTypes;

IconDiamond.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconDiamond;
