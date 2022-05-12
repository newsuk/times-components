import React from "react";
import { colours } from "@times-components/ts-styleguide";
import Svg, { Rect, Polygon } from "@times-components/svgs";
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
  <Svg
    aria-label="icon-video"
    role="img"
    viewBox={viewBox}
    {...clean({
      height,
      title,
      width: width || height * ratio
    })}
  >
    <Rect
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      height="40"
      width="50"
      x="0"
      y="0"
    />
    <Polygon
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      points="52 12 68 2 68 38 52 28"
    />
  </Svg>
);

IconVideo.propTypes = propTypes;

IconVideo.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconVideo;
