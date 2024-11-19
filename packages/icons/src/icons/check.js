import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const IconCheck = ({ fill = "#0A0A0A", width = 24, height = 24, title = "Check Icon" }) => (
  <svg
    aria-label="icon-check"
    role="img"
    viewBox="0 0 24 24"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <mask
      id="mask0_4528_7566"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="25"
    >
      <path
        d="M8.99991 16.1796L4.82991 12.0096L3.40991 13.4196L8.99991 19.0096L20.9999 7.00961L19.5899 5.59961L8.99991 16.1796Z"
        fill={fill}
      />
    </mask>
    <g mask="url(#mask0_4528_7566)">
      <rect y="0.00976562" width="24" height="24" fill="#01000D" />
    </g>
  </svg>
);

IconCheck.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

IconCheck.defaultProps = {
  fill: "#0A0A0A",
  width: 24,
  height: 24,
  title: "Check Icon",
};

export default IconCheck;
