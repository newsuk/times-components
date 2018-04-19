import React from "react";
import { clean } from "@times-components/utils";
import Svg, { Polygon } from "svgs";
import iconPropTypes from "./proptypes";

const viewBox =
  "11.756953239440918 11.182208061218262 17.48609161376953 16.630264282226562";

const ratio = 2 / 3;
const IconStar = ({ title, width, height, fillColour }) => (
  <Svg
    viewBox={viewBox}
    {...clean({ title, height, width: width || height * ratio })}
  >
    <Polygon
      fill={fillColour}
      points="20.5 24.9716827 15.0965 27.8124708 16.1284766 21.7955851 11.7569533 17.5344029 17.79825 16.6565511 20.5 11.1822077 23.20175 16.6565511 29.2430467 17.5344029 24.8715234 21.7955851 25.9035 27.8124708"
    />
  </Svg>
);

IconStar.propTypes = iconPropTypes;

IconStar.defaultProps = {
  fillColour: "#000000"
};

export default IconStar;
