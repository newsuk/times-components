import React from "react";
import TestRenderer from "react-test-renderer";
import { editionBreakpointWidths } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import { setDimension } from "@times-components/test-utils/dimensions";
import {
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
  mockSecondaryOneAndFourSlice,
  mockSecondaryTwoAndTwoSlice,
} from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import "./mocks";
import {
  DailyRegisterLeadFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadersSlice,
  LeadTwoNoPicAndTwoSlice,
  SecondaryOneAndFourSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  LeadOneAndFourSlice,
  SecondaryTwoNoPicAndTwoSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryTwoAndTwoSlice
} from "../src/slices";

const slices = [
  {
    mock: mockDailyRegisterSlice(),
    name: "daily universal register tablet slice",
    Slice: DailyRegisterLeadFourSlice
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "lead one and one tablet slice",
    Slice: LeadOneAndOneSlice
  },
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "lead one full width tablet slice",
    Slice: LeadOneFullWidthSlice
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "lead two no pic and two tablet slice",
    Slice: LeadTwoNoPicAndTwoSlice
  },
  {
<<<<<<< HEAD
    mock: mockLeadersSlice(),
    name: "leaders slice",
    Slice: LeadersSlice
=======
    mock: mockSecondaryOneAndFourSlice(),
    name: "secondary one and four tablet slice",
    Slice: SecondaryOneAndFourSlice
>>>>>>> feat: secondary one and four on tablet
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "secondary one tablet slice",
    Slice: SecondaryOneSlice
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "secondary four tablet slice",
    Slice: SecondaryFourSlice
  },
  {
    mock: mockSecondaryOneAndColumnistSlice(),
    name: "secondary one and columnist tablet slice",
    Slice: SecondaryOneAndColumnistSlice
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "secondary two and two tablet slice",
    Slice: SecondaryTwoAndTwoSlice
  },
  {
    mock: mockLeadOneAndFourSlice(),
    name: "lead one and four slice",
    Slice: LeadOneAndFourSlice
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "secondary two no pic and two tablet slice",
    Slice: SecondaryTwoNoPicAndTwoSlice
  }
];

const tabletTester = type =>
  slices.map(({ mock, name, Slice }) => ({
    name: `${name} - ${type}`,
    test: () => {
      setDimension({ width: editionBreakpointWidths[type] });
      const output = TestRenderer.create(
        <Responsive>
          <Slice onPress={() => {}} slice={mock} />
        </Responsive>
      );

      expect(output).toMatchSnapshot();
    }
  }));

export default () => {
  const tests = [
    ...tabletTester("medium"),
    ...tabletTester("wide"),
    ...tabletTester("huge")
  ];

  iterator(tests);
};
