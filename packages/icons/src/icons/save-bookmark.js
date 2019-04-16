import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const IconSaveBookmark = ({
  fillColour,
  height,
  opacity,
  strokeColour,
  title = "Save to My Articles",
  width
}) => (
  <Svg
    role="img"
    viewBox="0 0 12 16"
    {...clean({
      height,
      title,
      width: width || height
    })}
  >
    <Path
      {...clean({
        fill: fillColour,
        opacity,
        stroke: strokeColour
      })}
      d="M1 0h10a1 1 0 0 1 1 1v15l-5.98-4.466L0 16V1a1 1 0 0 1 1-1z"
    />
  </Svg>
);

IconSaveBookmark.propTypes = propTypes;

IconSaveBookmark.defaultProps = {
  fillColour: colours.functional.secondary,
  height: 16,
  width: 12
};

export default IconSaveBookmark;
