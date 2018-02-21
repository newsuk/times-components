import { StyleSheet, View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { DefaultSlice } from "./";

const styles = StyleSheet.create({
  child: {
    minHeight: 150
  }
});

const colours = [
  { backgroundColor: "red", key: 1 },
  { backgroundColor: "yellow", key: 2 },
  { backgroundColor: "green", key: 3 }
];

const createDefaultItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, key } = colour;
      if (key > noOfItems) return false;
      return (
        <View key={`item${key}`} style={[styles.child, { backgroundColor }]} />
      );
    })
    .filter(item => item !== false);

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
