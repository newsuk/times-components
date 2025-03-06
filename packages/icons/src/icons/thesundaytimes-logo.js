import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const TheSTLogo = ({
  fillColour,
  height,
  strokeColour,
  title = "ST",
  width
}) => (
  <svg
    aria-label="logo-the-sunday-times"
    role="img"
    viewBox="0 0 29 20"
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
        stroke: strokeColour
      })}
      d="M27.8,5.6 C27.1,2.3 25.2,1.2 23.3,1.2 L23.2,1.2 L23.2,10 C23.2,17.8 23.2,18.1 23.7,18.6 C24.2,19 24.8,19.2 25.4,19.1 L25.4,19.6 L16,19.6 L16,19.1 C16.6,19.2 17.2,19 17.7,18.6 C18.1,18.2 18.2,17.8 18.2,10 L18.2,1.1 L18.1,1.1 C16.2,1.1 14.2,2.3 13.6,5.5 L13,5.5 L13,0.3 L28.3,0.3 L28.3,5.6 C28.3,5.6 27.8,5.6 27.8,5.6 Z M6,19.9 C4.6,19.8 3.1,19.5 1.7,19.2 C1.3,19.2 0.9,19.4 0.6,19.6 L0.1,19.6 L0.4,14.1 L1,14.1 C1.2,17 2.8,18.8 5.7,18.8 C8.1,18.8 8.9,17.3 8.9,16 C8.8,11.5 0,11.9 0,5.9 C0,2.9 1.8,0 6.2,0 C7.4,0.1 8.7,0.3 10,0.6 C10.4,0.6 10.7,0.5 11,0.3 L11.4,0.3 L11.4,5.6 L10.9,5.6 C10.4,3.5 9.1,1 6.1,1 C4.2,1 3.3,2.1 3.3,3.3 C3.3,7.3 12.7,7 12.7,13.8 C12.7,17.3 9.9,19.9 6,19.9 Z"
    />
  </svg>
);

TheSTLogo.propTypes = propTypes;

TheSTLogo.defaultProps = {
  fillColour: colours.functional.white
};

export default TheSTLogo;
