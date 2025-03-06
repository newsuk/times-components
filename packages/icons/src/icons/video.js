import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const viewBox = "0 0 68 40";

const ratio = 68 / 40;
const IconVideo = ({
  fillColour,
  height,
  strokeColour,
  title = "Video Icon",
  width
}) => (
  <svg
    aria-label="icon-video"
    role="img"
    viewBox={viewBox}
    {...clean({
      height,
      title,
      width: width || height * ratio
    })}
  >
    <title>{title}</title>
    <rect
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      height="40"
      width="50"
      x="0"
      y="0"
    />
    <polygon
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      points="52 12 68 2 68 38 52 28"
    />
  </svg>
);

IconVideo.propTypes = propTypes;

IconVideo.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconVideo;
