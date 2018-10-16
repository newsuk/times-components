import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";
import SVGPath from "./path";

const { Path } = ART;

const Rect = ({
  stroke,
  fill,
  x,
  y,
  width,
  height,
  fillOpacity,
  strokeWidth
}) => {
  const d = new Path()
    .moveTo(x, y)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return (
    <SVGPath
      d={d}
      fill={fill}
      opacity={fillOpacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

Rect.propTypes = {
  fill: PropTypes.string,
  fillOpacity: PropTypes.string,
  height: PropTypes.string.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  width: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired
};

Rect.defaultProps = {
  fill: null,
  fillOpacity: null,
  stroke: null,
  strokeWidth: null
};

export default Rect;
