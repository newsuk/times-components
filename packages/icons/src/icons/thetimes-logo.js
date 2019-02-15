import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const TheTimesLogo = ({
  fillColour,
  height,
  strokeColour,
  title = "The Times",
  width
}) => (
  <Svg
    role="img"
    viewBox="0 0 95 95"
    {...clean({
      height,
      title,
      width: width || height
    })}
  >
    <Path
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      d="M45.152,0.247 L45.41,0.247 L2.476,0.247 L0.667,22.302 L1.967,23.007 C1.967,23.007 14.088,10.603 16.409,8.467 C18.723,6.326 20.42,5.438 21.905,4.938 C24.988,4.129 28.346,3.801 28.346,3.801 L29.165,3.801 L29.165,36.759 L29.1649992,65.6519982 L29.165,71.087 L16.73,76.491 L16.73,78.407 L57.585,78.407 L57.585,76.491 L45.151,71.087 L45.151,3.8 L45.939,3.8 C45.939,3.8 49.301,4.178 52.386,4.986 C53.87,5.486 55.565,6.224 57.878,8.365 C60.2,10.503 72.323,23.107 72.323,23.107 L73.623,22.253 L71.813,0.246 L45.438,0.246 L45.152,0.246 L36.3710938,48.0976562"
    />
  </Svg>
);

TheTimesLogo.propTypes = propTypes;

TheTimesLogo.defaultProps = {
  fillColour: colours.functional.white
};

export default TheTimesLogo;
