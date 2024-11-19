import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const PlayIcon = ({
  fill = "black",
  width = 24,
  height = 25,
  title = "Play Icon"
}) => (
  <svg
    aria-label="play-icon"
    role="img"
    viewBox="0 0 24 25"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
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
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string
};

PlayIcon.defaultProps = {
  fill: "black",
  width: 24,
  height: 25,
  title: "Play Icon"
};

export default PlayIcon;
