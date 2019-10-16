import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { G, Path } from "@times-components/svgs";
import { clean } from "../clean";
import propTypes from "./prop-types";

const viewBox = "14 10 10.592460632324219 20.397258758544922";

const ratio = 1 / 2;
const IconFacebook = ({
  fillColour,
  height,
  strokeColour,
  title = "Facebook Icon",
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
    <G
      fillRule="nonzero"
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
    >
      <Path d="M20.8754687,30.3972581 L20.8754687,21.0930804 L23.9984274,21.0930804 L24.4660462,17.4670773 L20.8754687,17.4670773 L20.8754687,15.1521034 C20.8754687,14.1022918 21.1669846,13.3868799 22.6723889,13.3868799 L24.5924599,13.3860409 L24.5924599,10.1429146 C24.2603909,10.0987257 23.1206168,10 21.7945782,10 C19.0262491,10 17.1309761,11.6898042 17.1309761,14.7929991 L17.1309761,17.4670773 L14,17.4670773 L14,21.0930804 L17.1309761,21.0930804 L17.1309761,30.3972581 L20.8754687,30.3972581 Z" />
    </G>
  </Svg>
);

IconFacebook.propTypes = propTypes;

IconFacebook.defaultProps = {
  fillColour: colours.functional.brandColour
};

export default IconFacebook;
