import React from "react";
import PropTypes from "prop-types";
import Svg, { Polygon, Rect } from "svgs";

const PlayIcon = ({ width, height }) =>
  <Svg width={width} height={height} viewBox="0 0 100 100">
    <Rect
      width="100"
      height="100"
      fill="rgba(0,0,0)"
      strokeWidth="8"
      stroke="rgb(255,255,255)"
      fillOpacity="0.4"
    />
    <Polygon points="30,20 70,50 30,80" fill="rgb(255,255,255)" />
  </Svg>;

PlayIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default PlayIcon;
