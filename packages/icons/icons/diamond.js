// @flow
import React from "react";
import Svg, { G, Path } from "svgs";

import type { Element } from "react";
import type { IconProps } from "../icons.flow";

export type DiamondProps = {
  ...IconProps,
  fillColour: string
};

const IconDiamond = ({
  width,
  height,
  fillColour
}: DiamondProps): Element<Svg> => (
  <Svg width={width} height={height} viewBox="0 0 20 20">
    <G fill={fillColour}>
      <Path d="M 0,10 10,20 20,10 10,0 Z" />
    </G>
  </Svg>
);

export default IconDiamond;
