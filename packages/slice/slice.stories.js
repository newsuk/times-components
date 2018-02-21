import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { DefaultSlice } from "./";

const moduleStyle = StyleSheet.create({
  item: {
    height: 150
  }
});

const colours = [
  { backgroundColor: "yellow", key: 1 },
  { backgroundColor: "red", key: 2 },
  { backgroundColor: "green", key: 3 }
];

const createDefaultItems = noOfItems => {
  const ChildContainer = getChildContainer(noOfItems);
  const Child = getChild(noOfItems);
  return colours
    .map(colour => {
      const { backgroundColor, key } = colour;
      if (key > noOfItems) return false;
      return (
        <View
          key={`item${key}`}
          style={[moduleStyle.item, { backgroundColor }]}
        />
      );
    })
    .filter(item => item !== false);
}

storiesOf("Primitives/Slice", module)
  .add("Default template with one item", () => (
    <DefaultSlice>{createDefaultItems(1)}</DefaultSlice>
  ))
  .add("Default template with two items", () => (
    <DefaultSlice>{createDefaultItems(2)}</DefaultSlice>
  ))
  .add("Default template with three items", () => (
    <DefaultSlice>{createDefaultItems(3)}</DefaultSlice>
  ));
