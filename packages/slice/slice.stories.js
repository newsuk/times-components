import { StyleSheet, View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { StandardSlice, LeadAndTwoSlice } from "./";

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

const createStandardItems = noOfItems =>
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
  .add("Standard template with one item", () => (
    <StandardSlice itemCount={1} renderItems={() => createStandardItems(1)} />
  ))
  .add("Standard template with two items", () => (
    <StandardSlice itemCount={2} renderItems={() => createStandardItems(2)} />
  ))
  .add("Standard template with three items", () => (
    <StandardSlice itemCount={3} renderItems={() => createStandardItems(3)} />
  ))
  .add("Lead and two template with one item", () => (
    <LeadAndTwoSlice
      lead={() => [
        <View
          key="lead"
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      ]}
    />
  ))
  .add("Lead and two template with two items", () => (
    <LeadAndTwoSlice
      lead={() => [
        <View
          key="lead"
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      ]}
      support1={() => [
        <View
          key={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      ]}
    />
  ))
  .add("Lead and two template with three items", () => (
    <LeadAndTwoSlice
      lead={() => [
        <View
          key="lead"
          style={{
            minHeight: 320,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      ]}
      support1={() => [
        <View
          key={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      ]}
      support2={() => [
        <View
          key={2}
          style={{
            minHeight: 150,
            backgroundColor: colours[2].backgroundColor
          }}
        />
      ]}
    />
  ));
