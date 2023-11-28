import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const TheTimesLogo = ({
  fillColour,
  height,
  strokeColour,
  title = "The Times",
  width
}) => (
  <svg
    aria-label="logo-the-times"
    role="img"
    viewBox="0 0 20 20"
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
      d="M12.270511,0 L12.265068,0 L0.495392588,0 L0,5.66216903 L0.355943638,5.79444825 C0.355943638,5.79444825 3.67918309,2.52419966 4.31502124,1.96431332 C4.94963279,1.40516309 5.41428374,1.26581719 5.82151454,1.13442131 C6.66633446,0.923157329 7.58850677,0.931254555 7.58850677,0.931254555 L7.61288542,0.931254555 L7.61288542,18.3144521 L4.49257141,19.7274916 L4.49257141,20 L15.5065086,20 L15.5065086,19.7274916 L12.3868846,18.3144521 L12.3868846,0.931254555 L12.4106499,0.931254555 C12.4106499,0.931254555 13.3319023,0.923157329 14.1775655,1.13442131 C14.584643,1.26581719 15.0493706,1.40516309 15.6836755,1.96431332 C16.3204336,2.52419966 19.6429064,5.79444825 19.6429064,5.79444825 L20,5.66216903 L19.5033042,0 L12.2723509,0 L12.2671379,0"
    />
  </svg>
);

TheTimesLogo.propTypes = propTypes;

TheTimesLogo.defaultProps = {
  fillColour: colours.functional.white
};

export default TheTimesLogo;
