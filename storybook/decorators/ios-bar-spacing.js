import React from "react";
import { View } from "react-native";

const BarSpacingDecorator = storyFn => (
  <View style={{ marginTop: 20 }}>{storyFn()}</View>
);

export default BarSpacingDecorator;
