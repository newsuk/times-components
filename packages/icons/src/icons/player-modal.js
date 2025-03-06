import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const PlayerModalIcon = ({
  fill = "#0A0A0A",
  width = 32,
  height = 32,
  title = "Player Modal Icon"
}) => (
  <svg
    aria-label="player-modal-icon"
    role="img"
    viewBox="0 0 32 32"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <mask
      id="mask0_4528_2997"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="-1"
      width="32"
      height="33"
    >
      <path d="M4 3.99023H28V6.6569H4V3.99023Z" fill={fill} />
    </mask>
    <g mask="url(#mask0_4528_2997)">
      <rect y="-0.00976562" width="32" height="32" fill="#01000D" />
    </g>
  </svg>
);

PlayerModalIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string
};

PlayerModalIcon.defaultProps = {
  fill: "#0A0A0A",
  width: 32,
  height: 32,
  title: "Player Modal Icon"
};

export default PlayerModalIcon;
