import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Path } from "@times-components/svgs";
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
  <Svg
    role="img"
    viewBox="0 0 20 20"
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
      d="M16.0321915,18.681086 L13.9014848,12.1628241 L19.4524784,8.14270857 L12.6019503,8.15770268 L10.5,1.63105093 L8.39804966,8.15770268 L1.54752164,8.14270857 L7.09851524,12.1628241 L4.96780845,18.681086 L10.5,14.6375865 L16.0321915,18.681086 Z"
    />
  </Svg>
);

IconStar.propTypes = propTypes;

IconStar.defaultProps = {
  fillColour: colours.functional.action
};

export default IconStar;
