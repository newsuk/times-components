import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape, Path: ARTPath } = ART;

const Path = ({ d, fill, stroke, strokeWidth, opacity }) => {
  const artStroke = stroke === "none" ? null : stroke;
  const artFill = fill === "none" ? null : fill;

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
  fill: null,
  stroke: null,
  strokeWidth: null,
  opacity: null
};

export default Path;
