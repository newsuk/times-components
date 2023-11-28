import React from "react";
import { TcView } from "@times-components/utils";
import { defaultProps, propTypes } from "./gradient-prop-types.base";

const GradientBase = ({ children, degrees, endColour, startColour, style }) => (
  <TcView
    style={{
      backgroundImage: `linear-gradient(${degrees}deg, ${startColour} 0%, ${endColour} 100%)`,

      ...style
    }}
  >
    {children}
  </TcView>
);

GradientBase.propTypes = propTypes;
GradientBase.defaultProps = defaultProps;

export default GradientBase;
