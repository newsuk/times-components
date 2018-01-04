import React from "react";
import Svg, { Path, Circle } from "svgs";
import PropTypes from "prop-types";

const ResetIcon = ({ width, strW = 14, svgW = 100 }) => {
  const r = svgW / 2;

  return (
    <Svg
      width={width}
      height={width * ((svgW + strW) / svgW)}
      viewBox={`0 0 ${svgW} ${svgW + strW}`}
    >
      <Circle
        r={(svgW - strW) / 2}
        cy={r + strW}
        cx={r}
        fill="none"
        stroke="white"
        strokeWidth={strW}
        strokeDasharray={1.5 * Math.PI * ((svgW - strW) / 2)}
      />
      <Path
        fill="white"
        d={`M${r} 0 L ${r + strW * 2.5} ${strW * 1.5} L ${r} ${strW * 3}z`}
      />
    </Svg>
  );
};

ResetIcon.defaultProps = {
  strW: 14,
  svgW: 100
};

ResetIcon.propTypes = {
  width: PropTypes.number.isRequired,
  strW: PropTypes.number,
  svgW: PropTypes.number
};

export default ResetIcon;
