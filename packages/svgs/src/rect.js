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
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  fill: PropTypes.string,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fillOpacity: PropTypes.string
};

Rect.defaultProps = {
  stroke: null,
  strokeWidth: null,
  fill: null,
  fillOpacity: null
};

export default Rect;
