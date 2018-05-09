import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Shape } = ART;

const Path = ({ d, fill }) => <Shape fill={fill} d={d} />;

Path.propTypes = {
  d: PropTypes.string.isRequired,
  fill: PropTypes.string
};

export default Path;
