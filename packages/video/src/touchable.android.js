import React from "react";
import { TouchableNativeFeedback } from "react-native";

const Touchable = props => (
  <TouchableNativeFeedback
    delayPressIn={0}
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
    {...props}
  />
);

export default Touchable;
