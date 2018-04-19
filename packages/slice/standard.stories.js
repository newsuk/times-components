import React from "react";
import { View } from "react-native";
import { select } from "@times-components/storybook";
import { storiesOf } from "@storybook/react-native";
import StandardSlice from "./src/templates/standard";

// knobs
const itemCountLabel = "Number of items:";
const itemCount = {
  1: "1",
  2: "2",
  3: "3"
};
const itemCountDefault = "1";

const colours = [
  { backgroundColor: "red", id: 1 },
  { backgroundColor: "yellow", id: 2 },
  { backgroundColor: "green", id: 3 }
];

const createStandardItems = noOfItems =>
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

storiesOf("Primitives/Slice", module).add("Standard", () => (
  <StandardSlice
    itemCount={Number(select(itemCountLabel, itemCount, itemCountDefault))}
    renderItems={() =>
      createStandardItems(select(itemCountLabel, itemCount, itemCountDefault))
    }
  />
));
