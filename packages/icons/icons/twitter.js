import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Path } from "svgs";
import iconPropTypes from "./proptypes";

const ratio = 75 / 60;
const IconTwitter = ({ width, height, fillColour }) => (
  <Svg
    width={width || height * ratio}
    height={height}
    viewBox="-354.2 -279.4 750 600"
  >
    <Path
      d="M391.3-210.7c-28.9,10.9-57.8,21.7-86.7,25.3c32.5-18.1,54.2-50.6,68.7-83.1c-28.9,18.1-61.5,28.9-97.6,36.1
        	c-28.9-28.9-68.7-47-112-47c-83.1,0-151.8,68.7-151.8,151.8c0,10.8,0,25.3,3.6,36.1c-126.5-7.3-238.6-68.7-314.5-159
        	c-14.5,21.7-21.7,50.6-21.7,75.9c0,54.2,25.3,101.2,68.7,126.5c-25.3,0-47-7.2-68.7-18.1c0,0,0,0,0,3.6
        	c0,72.3,54.2,137.4,122.9,148.2c-14.5,3.6-25.3,3.6-39.7,3.6c-10.9,0-18.1,0-28.9-3.6c18.1,61.5,75.9,104.8,141,104.8
        	c-50.6,39.8-119.3,65.1-188,65.1c-10.8,0-25.3,0-36.1-3.6c68.7,43.3,148.2,68.7,234.9,68.7C167.2,320.6,319,89.3,319-113.1
        	c0-7.2,0-14.4,0-18.1C344.3-152.9,369.6-181.8,391.3-210.7z"
      fill={fillColour}
    />
  </Svg>
);

IconTwitter.propTypes = iconPropTypes;

IconTwitter.defaultProps = {
  fillColour: colours.functional.action
};

export default IconTwitter;
