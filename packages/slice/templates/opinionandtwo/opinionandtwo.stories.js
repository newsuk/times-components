import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import OpinionAndTwoSlice from "./";

// knobs
const itemCountLabel = "Number of support items:";
const itemCount = ["0", "1", "2"];
const itemCountDefault = "0";
const itemCountGroup = "GROUP-ID1";

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

storiesOf("Primitives/Slice", module).add("Opinion and two", () => (
  <OpinionAndTwoSlice
    opinion={() => (
      <View
        id="opinion"
        style={{
          minHeight: 150,
          backgroundColor: "red"
        }}
      />
    )}
    renderSupports={() =>
      createSupportItems(
        select(itemCountLabel, itemCount, itemCountDefault, itemCountGroup)
      )
    }
  />
));
