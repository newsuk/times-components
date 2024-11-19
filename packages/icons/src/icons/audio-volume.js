import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const IconVolume = ({ fill = "#0A0A0A", width = 24, height = 24, title = "Volume Icon" }) => (
  <svg
    aria-label="icon-volume"
    role="img"
    viewBox="0 0 24 24"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <mask
      id="mask0_4571_9118"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 5.29047V3.23047C18.01 4.14047 21 7.72047 21 12.0005C21 16.2805 18.01 19.8605 14 20.7705V18.7105C16.89 17.8505 19 15.1705 19 12.0005C19 8.83047 16.89 6.15047 14 5.29047ZM3 9.00047V15.0005H7L12 20.0005V4.00047L7 9.00047H3ZM16.5 12.0005C16.5 10.2305 15.48 8.71047 14 7.97047V16.0205C15.48 15.2905 16.5 13.7705 16.5 12.0005Z"
        fill={fill}
      />
    </mask>
    <g mask="url(#mask0_4571_9118)">
      <rect width="24" height="24" fill="#01000D" />
    </g>
  </svg>
);

IconVolume.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

IconVolume.defaultProps = {
  fill: "#0A0A0A",
  width: 24,
  height: 24,
  title: "Volume Icon",
};

export default IconVolume;
