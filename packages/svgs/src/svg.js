// @flow

import * as React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";

const { Surface, Group, Transform } = ART;

/*
x and y can be negative
all of them can have decimals
*/
const viewBoxPattern = /^-?\d+(\.\d+)? -?\d+(\.\d+)? \d+(\.\d+)? \d+(\.\d+)?$/;

const Svg = ({ width, viewBox, children }) => {
  if (!viewBoxPattern.test(viewBox)) {
    throw new Error(`Invalid viewBox ${viewBox}`);
  }

  const [shapeX, shapeY, shapeWidth, shapeHeight] = viewBox
    .split(" ")
    .map(n => Number.parseInt(n, 10));
  const scale = width / shapeWidth;
  const transform = new Transform().translate(-shapeX, -shapeY);

  return (
    <Surface height={shapeHeight * scale} width={shapeWidth * scale}>
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
