import React from "react";
import { ScrollView } from "react-native";
import {
  mockLeadOneAndFourSlice,
  mockCommentLeadAndCartoonSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryOneAndFourSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockPuzzleSlice
} from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import {
  CommentLeadAndCartoonSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  LeadersSlice,
  PuzzleSlice
} from "./src/slices";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderSlice = (Component, data) => (_, { decorateAction }) => (
  <Responsive>
    <ScrollView>
      <Component
        onPress={preventDefaultedAction(decorateAction)("onPress")}
        slice={data}
      />
    </ScrollView>
  </Responsive>
);

const sliceStories = [
  {
    mock: mockLeadOneAndFourSlice(),
    name: "Lead One And Four (IJJJJ)",
    Slice: LeadOneAndFourSlice
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "Lead One And One (AB)",
    Slice: LeadOneAndOneSlice
  },
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "Lead One Full Width (Mobile: A, Tablet: R)",
    Slice: LeadOneFullWidthSlice
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "Lead Two no pic and Two (FBDE)",
    Slice: LeadTwoNoPicAndTwoSlice
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "Secondary One (A)",
    Slice: SecondaryOneSlice
  },
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "Supplement Secondary One And Four (NOOOO)",
    Slice: SecondaryOneAndFourSlice
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "Secondary Four (CCCC)",
    Slice: SecondaryFourSlice
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "Secondary Two And Two (CCGG)",
    Slice: SecondaryTwoAndTwoSlice
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "Secondary Two No Pic And Two (BBGG)",
    Slice: SecondaryTwoNoPicAndTwoSlice
  },
  {
    mock: mockListTwoAndSixNoPicSlice(),
    name: "List Two And Six No Pic Four (CCLLLLLL)",
    Slice: ListTwoAndSixNoPicSlice
  },
  {
    mock: mockLeadersSlice(),
    name: "Leaders (MMMM)",
    Slice: LeadersSlice
  },
  {
    mock: mockCommentLeadAndCartoonSlice(),
    name: "CommentLeadAndCartoonSlice (PQ)",
    Slice: CommentLeadAndCartoonSlice
  },
  {
    mock: mockPuzzleSlice(),
    name: "Puzzle",
    Slice: PuzzleSlice
  }
];

export default {
  children: sliceStories.map(({ mock, name, Slice }) => ({
    component: renderSlice(Slice, mock),
    name,
    type: "story"
  })),
  name: "Composed/Edition/Slices"
};
