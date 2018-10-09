import React from "react";
import { View } from "react-native";

export const CenteredDecorator = storyFn => (
  <View
    style={{
      alignItems: "center",
      bottom: 0,
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0
    }}
  >
    {storyFn()}
  </View>
);

export const BarSpacingDecorator = storyFn => (
  <View
    style={{
      flex: 1,
      marginTop: 20
    }}
  >
    {storyFn()}
  </View>
);

export const LateralSpacingDecorator = storyFn => (
  <View
    style={{
      flex: 1,
      marginLeft: 20,
      marginRight: 20
    }}
  >
    {storyFn()}
  </View>
);

export const WhiteBgColorDecorator = storyFn => (
  <View
    style={{
      backgroundColor: "white",
      bottom: 0,
      flex: 1,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0
    }}
  >
    {storyFn()}
  </View>
);
