// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { View } from "react-native";

const WhiteBgColorDecorator = storyFn => (
  <View style={{ backgroundColor: "white" }}>{storyFn()}</View>
);

export default WhiteBgColorDecorator;
