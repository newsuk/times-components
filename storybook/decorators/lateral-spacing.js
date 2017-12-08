import React from "react";
import { View } from "react-native";

const LateralSpacingDecorator = storyFn => (
  <View style={{ marginLeft: 20, marginRight: 20, flex: 1 }}>{storyFn()}</View>
);

export default LateralSpacingDecorator;
