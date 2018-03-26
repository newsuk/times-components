import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Rect, Polygon } from "svgs";
import iconPropTypes from "./proptypes";

const viewBox =
  "0.15463916957378387 0.049614034593105316 23.59917640686035 13.728596687316895";

const ratio = 43 / 25;
const IconVideo = ({ width, height, fillColour }) => (
  <Svg width={width || height * ratio} height={height} viewBox={viewBox}>
    <Rect
      fill={fillColour}
      x="0.154639175"
      y="0.139754386"
      width="15.4550103"
      height="13.5721404"
    />
    <Polygon
      fill={fillColour}
      points="16.3405361 4.14989474 16.3405361 9.66442105 22.0216082 12.8146667 22.0216082 0.999894737"
    />
    <Polygon
      fill={fillColour}
      points="23.7538144 0.0496140351 22.7616495 0.643508772 22.7616495 13.1902105 23.7538144 13.7782105"
    />
  </Svg>
);

IconVideo.propTypes = iconPropTypes;

IconVideo.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconVideo;
