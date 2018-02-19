import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Slice from "./slice";

const moduleStyle = {
  flex: 1,
  height: 150
};

const colours = [
  { backgroundColor: "blue", key: 1 },
  { backgroundColor: "red", key: 2 },
  { backgroundColor: "green", key: 3 }
];

const createItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, key } = colour;
      if (key > noOfItems) return false;
      return (
        <View key={`item${key}`} style={[moduleStyle, { backgroundColor }]} />
      );
    })
    .filter(item => item !== false);

storiesOf("Primitives/Slice", module)
  .add("Default template with one item", () => (
    <Slice template="DEFAULT">{createItems(1)}</Slice>
  ))
  .add("Default template with two items", () => (
    <Slice template="DEFAULT">{createItems(2)}</Slice>
  ))
  .add("Default template with three items", () => (
    <Slice template="DEFAULT">{createItems(3)}</Slice>
  ))
  .add("Lead template with one item", () => (
    <Slice template="LEAD_AND_TWO">{createItems(1)}</Slice>
  ))
  .add("Lead template with two items", () => (
    <Slice template="LEAD_AND_TWO">{createItems(2)}</Slice>
  ))
  .add("Lead template with three items", () => (
    <Slice template="LEAD_AND_TWO">{createItems(3)}</Slice>
  ));
