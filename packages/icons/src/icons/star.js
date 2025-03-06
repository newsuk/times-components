import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const IconStar = ({
  fillColour,
  height,
  opacity,
  strokeColour,
  title = "Save star",
  width
}) => (
  <svg
    aria-label="icon-save-star"
    role="img"
    viewBox="0 0 18 18"
    {...clean({
      height,
      title,
      width: width || height
    })}
  >
    <title>{title}</title>
    <path
      {...clean({
        fill: fillColour,
        opacity,
        stroke: strokeColour
      })}
      d="M13.616 16.644l-1.778-5.711 4.674-3.554-5.768.013L9 1.705 7.256 7.392 1.488 7.38l4.674 3.554-1.778 5.71L9 13.102l4.616 3.543z"
    />
  </svg>
);

IconStar.propTypes = propTypes;

IconStar.defaultProps = {
  fillColour: colours.functional.action
};

export default IconStar;
