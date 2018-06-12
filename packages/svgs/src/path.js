import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape, Path: ARTPath } = ART;

const Path = ({ d, fill, stroke, strokeWidth, opacity }) => {
  const artStroke = stroke === "none" ? undefined : stroke;
  const artFill = fill === "none" ? undefined : fill;

  return (
    <Shape
      fill={artFill}
      stroke={artStroke}
      strokeWidth={strokeWidth}
      d={d}
      opacity={opacity}
    />
  );
};

Path.propTypes = {
  d: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(ARTPath)])
    .isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  opacity: PropTypes.string
};

Path.defaultProps = {
  fill: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  opacity: undefined
};

export default Path;
