import React from "react";
import { colours } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";
import GradientBase from "./gradient.base";

const Gradient = ({ children, degrees, style }) => (
  <GradientBase
    degrees={degrees}
    endColour={colours.functional.backgroundSecondary}
    startColour={colours.functional.backgroundPrimary}
    style={style}
  >
    {children}
  </GradientBase>
);

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;

export default Gradient;
export { default as OverlayGradient } from "./overlay-gradient";
