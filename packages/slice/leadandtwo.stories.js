import React from "react";
import { ScrollView, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { select } from "@times-components/storybook";
import LeadAndTwoSlice from "./src/templates/leadandtwo";

// knobs
const itemCountLabel = "Number of support items:";
const itemCount = {
  0: "0",
  1: "1",
  2: "2"
};
const itemCountDefault = "0";

const colours = [
  { backgroundColor: "yellow", id: 1 },
  { backgroundColor: "green", id: 2 }
];

const createSupportItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, id } = colour;
      if (id > noOfItems) return false;
      return (
        <View
          id={`item-${id}`}
          style={[{ minHeight: 150 }, { backgroundColor }]}
        />
      );
    })
    .filter(item => item !== false);

storiesOf("Primitives/Slice", module).add("Lead and two", () => (
  <ScrollView>
    <LeadAndTwoSlice
      lead={() => (
        <View
          id="lead"
          style={{
            backgroundColor: "red",
            minHeight: 320
          }}
        />
      )}
      renderSupports={() =>
        createSupportItems(select(itemCountLabel, itemCount, itemCountDefault))
      }
    />
  </ScrollView>
));
