import React from "react";
import { View } from "react-native";

export const CenteredDecorator = storyFn => (
  <View
    style={{
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {storyFn()}
  </View>
);

export const BarSpacingDecorator = storyFn => (
  <View style={{ marginTop: 20, flex: 1 }}>{storyFn()}</View>
);

export const LateralSpacingDecorator = storyFn => (
  <View style={{ marginLeft: 20, marginRight: 20, flex: 1 }}>{storyFn()}</View>
);

export const WhiteBgColorDecorator = storyFn => (
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
