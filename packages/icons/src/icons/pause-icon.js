import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const PauseIcon = ({ fill = "black", width = 25, height = 24, title = "Pause Icon" }) => (
  <svg
    aria-label="pause-icon"
    role="img"
    viewBox="0 0 25 24"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
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
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

PauseIcon.defaultProps = {
  fill: "black",
  width: 25,
  height: 24,
  title: "Pause Icon",
};

export default PauseIcon;
