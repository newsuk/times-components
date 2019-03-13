
import React from "react";
import { ScrollView } from "react-native";
import {
  mockPuzzleSlice
} from "@times-components/fixture-generator";
import Context from "@times-components/context";
import Responsive from "@times-components/responsive";
import {
  PuzzleSlice,
} from "./src/slices";

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

const getPuzzleslice = (count) => {
  puzzles = new Array(count).fill(0).map(() => mockPuzzleSlice());
  const { name, id } = puzzles[0];

  return { name, id, tiles: puzzles }
};

const sliceStories = [
  {
    mock: getPuzzleslice(1),
    name: "Single Puzzle",
    Slice: PuzzleSlice
  },
  {
    mock: getPuzzleslice(5),
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
