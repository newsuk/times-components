import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";
import SVGPath from "./path";

const { Path } = ART;

const Rect = ({ stroke, fill, x, y, width, height }) => {
  const d = new Path()
    .moveTo(x, y)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return <SVGPath d={d} fill={fill} stroke={stroke} />;
};

Rect.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

Rect.defaultProps = {
  stroke: null,
  fill: null
};

export default Rect;
