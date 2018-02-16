import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Slice from "./slice";

const moduleStyle = {
  flex: 1,
  height: 150
};

const Module = backgroundColor => (
  <View style={[moduleStyle, backgroundColor]} />
);

storiesOf("Primitives/Slice", module).add("Defaut template", () => (
  <Slice template="DEFAULT">
    <Module backgroundColor="blue" />
    <Module backgroundColor="red" />
    <Module backgroundColor="green" />
  </Slice>
));
