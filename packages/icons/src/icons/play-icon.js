import React from "react";
import PropTypes from "prop-types";

const PlayIcon = ({ fill }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Play Icon"
    role="img"
  >
    <mask
      id="mask0_4528_3091"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="25"
    >
      <path d="M8 5.66699V19.667L19 12.667L8 5.66699Z" fill={fill} />
    </mask>

    <g mask="url(#mask0_4528_3091)">
      <rect y="0.666992" width="24" height="24" fill={fill} />
    </g>
  </svg>
);

PlayIcon.propTypes = {
  fill: PropTypes.string.isRequired
};

export default PlayIcon;