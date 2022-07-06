import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const viewBox = "0 0 22 16";

const ratio = 22 / 16;
const IconEmail = ({
  fillColour,
  height,
  strokeColour,
  title = "Email Icon",
  width
}) => (
  <svg
    aria-label="icon-email"
    role="img"
    viewBox={viewBox}
    {...clean({
      height,
      title,
      width: width || height * ratio
    })}
  >
    <title>{title}</title>
    <g
      fillRule="nonzero"
      {...clean({ fill: fillColour, stroke: strokeColour })}
    >
      <path d="M22,0 L22,16 L0,16 L0,0 L22,0 Z M13.5135,8 L20.2711667,2.23985068 L20.0346667,1.91880541 L11,9.20018665 L2.04233333,2.00093327 L1.80583333,2.32197853 L8.56533333,8.08026132 L1.80766667,13.8404106 L2.04233333,14.1595894 L9.0365,8.47970135 L11,10.1595894 L13.0423333,8.39944004 L20.0346667,14.079328 L20.2711667,13.7582828 L13.5135,8 Z" />
    </g>
  </svg>
);

IconEmail.propTypes = propTypes;

IconEmail.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconEmail;
