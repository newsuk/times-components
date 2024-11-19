import React from "react";
import PropTypes from "prop-types";
import BaseIcon from "./BaseIcon";

const AudioCloseIcon = ({ fill, ...props }) => (
  <BaseIcon {...props}>
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
  </BaseIcon>
);

AudioCloseIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

AudioCloseIcon.defaultProps = {
  fill: "#0A0A0A",
  title: "Audio Close Icon",
};

export default AudioCloseIcon;
