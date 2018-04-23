import React from "react";
import { TouchableNativeFeedback } from "react-native";

const Touchable = props => (
  <TouchableNativeFeedback
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
    delayPressIn={0}
    {...props}
  />
);

export default Touchable;
