import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";
import GradientBase from "./gradient.base";

const OverlayGradient = props => (
  <GradientBase
    {...props}
    endColour={colours.functional.overlayGradientEnd}
    startColour={colours.functional.overlayGradientStart}
  />
);

OverlayGradient.propTypes = propTypes;
OverlayGradient.defaultProps = defaultProps;

export default OverlayGradient;
