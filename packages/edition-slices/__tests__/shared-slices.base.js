import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  mockCommentLeadAndCartoonSlice,
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryFourSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockSecondaryOneAndFourSlice,
  mockPuzzleSlice
} from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import "./mocks";
import {
  CommentLeadAndCartoonSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  LeadersSlice,
  SecondaryOneSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  PuzzleSlice
} from "../src/slices";

const slices = [
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "lead one full width slice",
    Slice: LeadOneFullWidthSlice
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "lead one and one slice",
    Slice: LeadOneAndOneSlice
  },
  {
    mock: mockLeadOneAndFourSlice(),
    name: "lead one and four slice",
    Slice: LeadOneAndFourSlice
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "lead Two No Pic And Two",
    Slice: LeadTwoNoPicAndTwoSlice
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "secondary one slice",
    Slice: SecondaryOneSlice
  },
  {
    mock: mockSecondaryOneAndColumnistSlice(),
    name: "secondary one and columnist slice",
    Slice: SecondaryOneAndColumnistSlice
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "secondary four slice",
    Slice: SecondaryFourSlice
  },
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "secondary one and four slice",
    Slice: SecondaryOneAndFourSlice
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "secondary two and two slice",
    Slice: SecondaryTwoAndTwoSlice
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "secondary two no pic and two slice",
    Slice: SecondaryTwoNoPicAndTwoSlice
  },
  {
    mock: mockListTwoAndSixNoPicSlice(),
    name: "list two and six no pic slice",
    Slice: ListTwoAndSixNoPicSlice
  },
  {
    mock: mockLeadersSlice(),
    name: "leaders slice",
    Slice: LeadersSlice
  },
  {
    mock: mockCommentLeadAndCartoonSlice(),
    name: "Comment lead and cartoon slice",
    Slice: CommentLeadAndCartoonSlice
  },
  {
    mock: mockPuzzleSlice(),
    name: "puzzle slice",
    Slice: PuzzleSlice
  }
];

export default () => {
  const tests = slices.map(({ mock, name, Slice }) => ({
    name,
    test: () => {
      const output = TestRenderer.create(
        <Responsive>
          <Slice onPress={() => {}} slice={mock} />
        </Responsive>
      );

      expect(output).toMatchSnapshot();
    }
  }));

  iterator(tests);
};
