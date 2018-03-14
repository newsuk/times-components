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
  { backgroundColor: "red", id: 1 },
  { backgroundColor: "yellow", id: 2 },
  { backgroundColor: "green", id: 3 },
  { backgroundColor: "blue", id: 4 }
];

const createStandardItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, id } = colour;
      if (id > noOfItems) return false;
      return (
        <View id={`item-${id}`} style={[styles.child, { backgroundColor }]} />
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
      lead={() => (
        <View
          id="lead"
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      )}
    />
  ))
  .add("Lead and two template with two items", () => (
    <LeadAndTwoSlice
      lead={() => (
        <View
          id="lead"
          style={{
            minHeight: 150,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      )}
      support1={() => (
        <View
          id={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      )}
    />
  ))
  .add("Lead and two template with three items", () => (
    <LeadAndTwoSlice
      lead={() => (
        <View
          id="lead"
          style={{
            minHeight: 320,
            backgroundColor: colours[0].backgroundColor
          }}
        />
      )}
      support1={() => (
        <View
          id={1}
          style={{
            minHeight: 150,
            backgroundColor: colours[1].backgroundColor
          }}
        />
      )}
      support2={() => (
        <View
          id={2}
          style={{
            minHeight: 150,
            backgroundColor: colours[2].backgroundColor
          }}
        />
      )}
    />
  ));
