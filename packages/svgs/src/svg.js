// @flow

import * as React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Surface, Group, Transform } = ART;

const Svg = ({ width, viewBox, children }) => {
  const [shapeX, shapeY, shapeWidth, shapeHeight] = viewBox
    .split(" ")
    .map(n => Number.parseInt(n, 10));
  const scale = width / shapeWidth;
  const transform = new Transform().translate(-shapeX, -shapeY);

  return (
    <Surface width={shapeWidth * scale} height={shapeHeight * scale}>
      <Group scale={scale} transform={transform}>
        {children}
      </Group>
    </Surface>
  );
};

Svg.propTypes = {
  width: PropTypes.number.isRequired,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Svg;
