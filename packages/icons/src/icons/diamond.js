import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { G, Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const IconDiamond = ({
  fillColour,
  height,
  strokeColour,
  title = "Diamond Icon",
  width
}) => (
  <Svg
    role="img"
    viewBox="0 0 20 20"
    {...clean({
      height,
      title,
      width: width || height
    })}
  >
    <G {...clean({ fill: fillColour, stroke: strokeColour })}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

IconDiamond.propTypes = propTypes;

IconDiamond.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconDiamond;
