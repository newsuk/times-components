import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const AudioCloseIcon = ({ fill = "#000", width = 24, height = 24, title = "Audio Close Icon" }) => (
  <svg
    aria-label="audio-close-icon"
    role="img"
    viewBox="0 0 24 24"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <mask
      id="mask0_4612_9510"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill={fill}
      />
    </mask>
    <g mask="url(#mask0_4612_9510)">
      <rect width="24" height="24" fill={fill} />
    </g>
  </svg>
);

AudioCloseIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

AudioCloseIcon.defaultProps = {
  fill: "#000",
  width: 24,
  height: 24,
  title: "Audio Close Icon",
};

export default AudioCloseIcon;
