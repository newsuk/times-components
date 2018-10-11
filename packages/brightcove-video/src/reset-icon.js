import React from "react";
import Svg, { Path, Circle } from "@times-components/svgs";
import PropTypes from "prop-types";

const ResetIcon = ({ width, strW = 14, svgW = 100 }) => {
  const r = svgW / 2;

  return (
    <Svg
      height={width * ((svgW + strW) / svgW)}
      viewBox={`0 0 ${svgW} ${svgW + strW}`}
      width={width}
    >
      <Circle
        cx={r}
        cy={r + strW}
        fill="none"
        r={(svgW - strW) / 2}
        stroke="white"
        strokeDasharray={1.5 * Math.PI * ((svgW - strW) / 2)}
        strokeWidth={strW}
      />
      <Path
        d={`M${r} 0 L ${r + strW * 2.5} ${strW * 1.5} L ${r} ${strW * 3}z`}
        fill="white"
      />
    </Svg>
  );
};

ResetIcon.defaultProps = {
  strW: 14,
  svgW: 100
};

ResetIcon.propTypes = {
  strW: PropTypes.number,
  svgW: PropTypes.number,
  width: PropTypes.number.isRequired
};

export default ResetIcon;
