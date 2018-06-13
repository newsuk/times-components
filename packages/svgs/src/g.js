import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Group } = ART;

const G = ({ fill, stroke, strokeWidth, opacity, children }) => {
  const onlyAssignedProps = props => key => props[key] !== null;
  const reconstructProps = props => (obj, key) => ({
    [key]: props[key],
    ...obj
  });

  const childrenWithProps = React.Children.map(children, child => {
    const originalProps = child.props;
    const cleanProps = Object.keys(originalProps)
      .filter(onlyAssignedProps(originalProps))
      .reduce(reconstructProps(originalProps), {});

    return React.cloneElement(child, {
      fill,
      stroke,
      strokeWidth,
      opacity,
      ...cleanProps
    });
  });
  return (
    <Group fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
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
  stroke: null,
  strokeWidth: null,
  opacity: null
};

export default G;
