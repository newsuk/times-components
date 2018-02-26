import PropTypes from "prop-types";
import React from "react";
import { Svg, Path } from "svgs";
import { colours } from "@times-components/styleguide";

const T = ({ width, height }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 81 84"
  >
    <Path
      fill={colours.functional.white}
      fillRule="evenodd"
      d="M49.696 0H2.006L0 23.781l1.442.556S14.9 10.602 17.476 8.25c2.57-2.348 4.452-2.934 6.101-3.485 3.422-.888 7.156-.854 7.156-.854h.1v73.01l-12.638 5.934V84H62.8v-1.145l-12.634-5.934V3.91h.096s3.731-.034 7.156.854c1.649.551 3.531 1.137 6.1 3.485 2.579 2.352 16.035 16.087 16.035 16.087L81 23.78 78.988 0H49.682"
    />
  </Svg>
);

T.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default T;
