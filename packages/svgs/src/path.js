import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape } = ART;

const Path = ({ d, fill, stroke, strokeWidth, opacity }) => (
  <Shape fill={fill} stroke={stroke} strokeWidth={strokeWidth} d={d} opacity={opacity} />
);

Path.propTypes = {
  d: PropTypes.string.isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  opacity: PropTypes.string
};

export default Path;
