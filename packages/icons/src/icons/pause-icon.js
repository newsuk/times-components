import React from "react";
import PropTypes from "prop-types";

const PauseIcon = ({ fill }) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Pause Icon"
    role="img"
  >
    <mask
      id="mask0_4528_2487"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 19H6.5V5H10.5V19ZM14.5 19V5H18.5V19H14.5Z"
        fill={fill}
      />
    </mask>

    <g mask="url(#mask0_4528_2487)">
      <rect x="0.5" width="24" height="24" fill={fill} />
    </g>
  </svg>
);

PauseIcon.propTypes = {
  fill: PropTypes.string.isRequired
};

export default PauseIcon;
