import React from "react";
import Svg, { Path, Circle } from "svgs";

const ResetIcon = () => (
  <Svg width={15} height={15.15} viewBox="0 0 100 114">
    <Circle
      r="43"
      cy="64"
      cx="50"
      fill="none"
      stroke="white"
      strokeWidth={14}
      strokeDasharray={1.5 * Math.PI * 43}
    />
    <Path fill="white" d="M50 0 L 85 21 L 50 42z" />
  </Svg>
);

export default ResetIcon;
