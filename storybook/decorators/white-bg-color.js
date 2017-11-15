// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { View } from "react-native";

const WhiteBgColorDecorator = storyFn => (
  <View
    style={{
      backgroundColor: "white",
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }}
  >
    {storyFn()}
  </View>
);

export default WhiteBgColorDecorator;
