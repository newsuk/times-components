import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Rect, Polygon } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const viewBox =
  "0.15463916957378387 0.049614034593105316 23.59917640686035 13.728596687316895";

const ratio = 43 / 25;
const IconVideo = ({
  fillColour,
  height,
  strokeColour,
  title = "Video Icon",
  width
}) => (
  <Svg
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
      height="13.5721404"
      width="15.4550103"
      x="0.154639175"
      y="0.139754386"
    />
    <Polygon
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      points="16.3405361 4.14989474 16.3405361 9.66442105 22.0216082 12.8146667 22.0216082 0.999894737"
    />
    <Polygon
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      points="23.7538144 0.0496140351 22.7616495 0.643508772 22.7616495 13.1902105 23.7538144 13.7782105"
    />
  </Svg>
);

IconVideo.propTypes = propTypes;

IconVideo.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconVideo;
