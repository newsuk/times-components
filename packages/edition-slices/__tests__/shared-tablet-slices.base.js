import React from "react";
import TestRenderer from "react-test-renderer";
import { editionBreakpointWidths } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import { getDimensions } from "@times-components/utils";
import {
  mockCommentLeadAndCartoonSlice,
  mockDailyRegisterSlice,
  mockLeadersSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneFullWidthSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockLeadOneAndFourSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryTwoAndTwoSlice,
  mockStandardSlice,
  getPuzzleSlices,
  mockSecondaryOneAndFourSlice,
  mockListTwoAndSixNoPicSlice
} from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import "./mocks";
import {
  CommentLeadAndCartoonSlice,
  DailyRegisterLeadFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadersSlice,
  LeadOneAndFourSlice,
  LeadTwoNoPicAndTwoSlice,
  PuzzleSlice,
  SecondaryOneAndFourSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoNoPicAndTwoSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryTwoAndTwoSlice,
  StandardSlice,
  ListTwoAndSixNoPicSlice
} from "../src/slices";

const slices = [
  {
    mock: mockCommentLeadAndCartoonSlice(),
    name: "comment lead and cartoon",
    Slice: CommentLeadAndCartoonSlice
  },
  {
    mock: mockDailyRegisterSlice(),
    name: "daily universal register",
    Slice: DailyRegisterLeadFourSlice
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "lead one and one",
    Slice: LeadOneAndOneSlice
  },
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "lead one full width",
    Slice: LeadOneFullWidthSlice
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "lead two no pic and two",
    Slice: LeadTwoNoPicAndTwoSlice
  },
  {
    mock: mockLeadersSlice(),
    name: "leaders slice",
    Slice: LeadersSlice
  },
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "secondary one and four",
    Slice: SecondaryOneAndFourSlice
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "secondary one",
    Slice: SecondaryOneSlice
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "secondary four",
    Slice: SecondaryFourSlice
  },
  {
    mock: mockSecondaryOneAndColumnistSlice(),
    name: "secondary one and columnist",
    Slice: SecondaryOneAndColumnistSlice
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "secondary two and two",
    Slice: SecondaryTwoAndTwoSlice
  },
  {
    mock: mockLeadOneAndFourSlice(),
    name: "lead one and four slice",
    Slice: LeadOneAndFourSlice
  },
  {
    mock: mockStandardSlice(),
    name: "standard slice",
    Slice: StandardSlice
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "secondary two no pic and two",
    Slice: SecondaryTwoNoPicAndTwoSlice
  },
  {
    mock: mockListTwoAndSixNoPicSlice(),
    name: "list two and six no pic",
    Slice: ListTwoAndSixNoPicSlice
  },
  {
    mock: { puzzles: getPuzzleSlices(3) },
    name: "puzzle",
    Slice: PuzzleSlice
  }
];

jest.mock("@times-components/utils", () => {
  // eslint-disable-next-line global-require
  const actualUtils = jest.requireActual("@times-components/utils");

  return {
    ...actualUtils,
    getDimensions: jest.fn()
  };
});

const tabletTester = type =>
  slices.map(({ mock, name, Slice }) => ({
    name: `${name} - ${type}`,
    test: () => {
      getDimensions.mockImplementation(() => ({
        width: editionBreakpointWidths[type]
      }));
      const output = TestRenderer.create(
        <Responsive>
          <Slice onPress={() => {}} slice={mock} />
        </Responsive>
      );

      expect(output).toMatchSnapshot();
    }
  }));

export default () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const tests = [
    ...tabletTester("medium"),
    ...tabletTester("wide"),
    ...tabletTester("huge")
  ];

  iterator(tests);
};
