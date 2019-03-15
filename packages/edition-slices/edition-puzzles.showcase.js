import React from "react";
import { ScrollView } from "react-native";
import Context from "@times-components/context";
import Responsive from "@times-components/responsive";
import { getPuzzleSlices } from "@times-components/fixture-generator";
import { PuzzleSlice } from "./src/slices";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const publications = {
  ST: "SUNDAYTIMES",
  TIMES: "TIMES"
};
/* eslint-disable react/prop-types */
const renderSlice = (Component, data) => ({ select }, { decorateAction }) => (
  <Responsive>
    <ScrollView>
      <Context.Provider
        value={{
          publicationName: select("Publication:", publications, "TIMES")
        }}
      >
        <Component
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          slice={data}
        />
      </Context.Provider>
    </ScrollView>
  </Responsive>
);

const sliceStories = [
  {
    mock: { puzzles: getPuzzleSlices(1) },
    name: "Single Puzzle",
    Slice: PuzzleSlice
  },
  {
    mock: { puzzles: getPuzzleSlices(3) },
    name: "Multiple Puzzles",
    Slice: PuzzleSlice
  }
];

export default {
  children: sliceStories.map(({ mock, name, Slice }) => ({
    component: renderSlice(Slice, mock),
    name,
    type: "story"
  })),
  name: "Composed/Edition/Puzzles"
};
