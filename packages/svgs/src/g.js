import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Group } = ART;

const G = ({ fill, fillRule, stroke, strokeWidth, children }) => {
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { fill, fillRule, stroke, strokeWidth }));
  return (<Group
    fill={fill}
    fillRule={fillRule}
    stroke={stroke}
    strokeWidth={strokeWidth}
  >
    {childrenWithProps}
  </Group>);
};

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
