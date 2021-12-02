import React from "react";
import { View } from "react-native";
import { defaultProps, propTypes } from "./gradient-prop-types.base";

const GradientBase = ({ children, degrees, endColour, startColour, style }) => (
  <View
    style={[
      {
        backgroundImage: `linear-gradient(${degrees}deg, ${startColour} 0%, ${endColour} 100%)`
      },
      style
    ]}
  >
    {children}
  </View>
);

GradientBase.propTypes = propTypes;
GradientBase.defaultProps = defaultProps;

export default GradientBase;
