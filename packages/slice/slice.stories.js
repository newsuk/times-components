import { StyleSheet, View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { DefaultSlice, LeadSlice } from "./";

const styles = StyleSheet.create({
  child: {
    minHeight: 150
  }
});

const colours = [
  { backgroundColor: "red", key: 1 },
  { backgroundColor: "yellow", key: 2 },
  { backgroundColor: "green", key: 3 },
  { backgroundColor: "blue", key: 4 }
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
  ))
  .add("Lead template with one item", () => (
    <LeadSlice
      lead={
        <View
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      }
    />
  ))
  .add("Lead template with two items", () => (
    <LeadSlice
      lead={
        <View
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      }
      support1={
        <View
          key={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      }
    />
  ))
  .add("Lead template with three items", () => (
    <LeadSlice
      lead={
        <View
          style={{
            minHeight: 320,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      }
      support1={
        <View
          key={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      }
      support2={
        <View
          key={2}
          style={{
            minHeight: 150,
            backgroundColor: colours[2].backgroundColor
          }}
        />
      }
    />
  ));
