import "react-native";
import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { IconDiamond, IconTwitter } from "./icons";

storiesOf("Icons", module).add("Icons", () => (
  <View>
    <IconDiamond width={50} height={50} fillColour="#FF0000" />
    <IconTwitter width={50} height={50} />
  </View>
));
