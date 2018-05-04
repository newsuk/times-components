import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Group } = ART;

const G = ({ fill, fillRule, stroke, strokeWidth, children }) => (
  <Group
    fill={fill}
    fillRule={fillRule}
    stroke={stroke}
    strokeWidth={strokeWidth}
  >
    {children}
  </Group>
);

G.propTypes = {
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  children: PropTypes.node.isRequired
};

G.defaultProps = {
  fill: null,
  fillRule: null,
  stroke: null,
  strokeWidth: null
};

export default G;
