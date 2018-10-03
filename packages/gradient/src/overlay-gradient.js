import React from "react";
import { colours } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";
import GradientBase from "./gradient.base";

const OverlayGradient = ({ children, degrees, style }) => (
  <GradientBase
    degrees={degrees}
    endColour={colours.functional.overlayGradientEnd}
    startColour={colours.functional.overlayGradientStart}
    style={style}
  >
    {children}
  </GradientBase>
);

OverlayGradient.propTypes = propTypes;
OverlayGradient.defaultProps = defaultProps;

export default OverlayGradient;
