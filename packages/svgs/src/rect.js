import React from "react";
import { ART } from "react-native";
const { Shape, Path } = ART;

const Rect = ({ stroke, fill, x, y, width, height }) => {
  const d = new Path()
    .moveTo(x, y)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return <Shape fill={fill} d={d} />;
};

export default Rect;
