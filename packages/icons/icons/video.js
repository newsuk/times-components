import React from "react";
import PropTypes from "prop-types";
import Svg, { Path } from "svgs";

const viewBox = [
  0.15463916957378387,
  0.049614034593105316,
  23.59917640686035,
  13.728596687316895
].join(" ");

const IconVideo = ({ width, height, fillColour }) => (
  <Svg width={width} height={height} viewBox={viewBox}>
    <rect fill={fillColour} x="0.154639175" y="0.139754386" width="15.4550103" height="13.5721404"/>
    <polygon fill={fillColour} points="16.3405361 4.14989474 16.3405361 9.66442105 22.0216082 12.8146667 22.0216082 0.999894737"/>
    <polygon fill={fillColour} points="23.7538144 0.0496140351 22.7616495 0.643508772 22.7616495 13.1902105 23.7538144 13.7782105"/>
  </Svg>
);

IconVideo.propTypes = {
  fillColour: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

IconVideo.defaultProps = {
  fillColour: "black"
};

export default IconVideo;
