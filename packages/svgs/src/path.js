import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape } = ART;

const Path = ({ d, fill, stroke }) => (
  <Shape fill={fill} stroke={stroke} d={d} />
);

Path.propTypes = {
  d: PropTypes.string.isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string
};

export default Path;
