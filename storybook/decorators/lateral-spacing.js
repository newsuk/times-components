// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { View } from "react-native";

const LateralSpacingDecorator = storyFn => (
  <View style={{ marginLeft: 20, marginRight: 20 }}>{storyFn()}</View>
);

export default LateralSpacingDecorator;
