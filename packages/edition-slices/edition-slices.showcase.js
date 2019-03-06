import React from "react";
import { ScrollView } from "react-native";
import {
  mockDailyRegisterSlice,
  mockLeadOneAndFourSlice,
  mockCommentLeadAndCartoonSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryFourSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryOneAndFourSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockPuzzleSlice
} from "@times-components/fixture-generator";
import Context from "@times-components/context";
import Responsive from "@times-components/responsive";
import {
  CommentLeadAndCartoonSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryOneSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  LeadersSlice,
  PuzzleSlice,
  DailyRegisterLeadFourSlice
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

const sliceStories = [
  {
    mock: mockDailyRegisterSlice(),
    name: "Daily Register Lead Four (SSSS)",
    Slice: DailyRegisterLeadFourSlice
  },
  {
    mock: mockLeadOneAndFourSlice(),
    name: "Lead One And Four (IJJJJ)",
    Slice: LeadOneAndFourSlice
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "Lead One And One (Mobile: AB, Tablet: UC)",
    Slice: LeadOneAndOneSlice
  },
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "Lead One Full Width (Mobile: A, Tablet: R)",
    Slice: LeadOneFullWidthSlice
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "Lead Two no pic and Two (Mobile: FBDE, Tablet: XYDZ)",
    Slice: LeadTwoNoPicAndTwoSlice
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "Secondary One (Mobile:A, Tablet: W)",
    Slice: SecondaryOneSlice
  },
  {
    mock: mockSecondaryOneAndColumnistSlice(),
    name: "Secondary One and Columnist (TH)",
    Slice: SecondaryOneAndColumnistSlice
  },
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "Supplement Secondary One And Four (NOOOO)",
    Slice: SecondaryOneAndFourSlice
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "Secondary Four (Mobile, Tablet: CCCC)",
    Slice: SecondaryFourSlice
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "Secondary Two And Two (Mobile: CCGG, Tablet: VVGG)",
    Slice: SecondaryTwoAndTwoSlice
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "Secondary Two No Pic And Two (Mobile: B,B,G,G - Tablet: AE,AE,G,G)",
    Slice: SecondaryTwoNoPicAndTwoSlice
  },
  {
    mock: mockListTwoAndSixNoPicSlice(),
    name: "List Two And Six No Pic (Mobile, Tablet: CCLLLLLL)",
    Slice: ListTwoAndSixNoPicSlice
  },
  {
    mock: mockLeadersSlice(),
    name: "Leaders (MMMM)",
    Slice: LeadersSlice
  },
  {
    mock: mockCommentLeadAndCartoonSlice(),
    name: "Comment Lead And Cartoon (PQ)",
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
