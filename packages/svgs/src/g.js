import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Group } = ART;

const G = ({ fill, stroke, strokeWidth, opacity, children }) => {
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      fill,
      stroke,
      strokeWidth,
      opacity,
      ...child.props
    })
  );
  return (
    <Group
      fill={fill}
      fillRule={fillRule}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      {childrenWithProps}
    </Group>
  );
};

G.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  opacity: PropTypes.string,
  children: PropTypes.node.isRequired
};

G.defaultProps = {
  fill: null,
  fillRule: null,
  stroke: null,
  strokeWidth: null
};

export default G;
