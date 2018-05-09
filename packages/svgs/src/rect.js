import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape, Path } = ART;

const Rect = ({ stroke, fill, x, y, width, height }) => {
  const d = new Path()
    .moveTo(x, y)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return <Shape stroke={stroke} fill={fill} d={d} />;
};

Rect.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

export default Rect;
