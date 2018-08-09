import React from "react";
import { View } from "react-native";
import { colours } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";

const Gradient = ({ children, degrees, style }) => (
  <View
    style={[
      {
        backgroundImage: `linear-gradient(${degrees}deg, ${
          colours.functional.backgroundPrimary
        } 0%, ${colours.functional.backgroundSecondary} 100%)`
      },
      style
    ]}
  >
    {children}
  </View>
);

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;

export default Gradient;
