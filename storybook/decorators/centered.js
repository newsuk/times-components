import React from "react";
import { View } from "react-native";

const CenteredDecorator = storyFn => (
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

export default CenteredDecorator;
