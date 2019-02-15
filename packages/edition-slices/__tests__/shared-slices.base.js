import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockSecondaryOneAndFourSlice
} from "@times-components/fixture-generator";
import {
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  LeadersSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice
} from "../src/slices";

jest.mock("../src/tiles", () => {
  const tileMocks = {};
  Object.keys(require.requireActual("../src/tiles")).forEach(key => {
    tileMocks[key] = key;
  });
  return tileMocks;
});
jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/icons", () => ({
  TheTimesLogo: "TheTimesLogo"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");

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
  }
];

export default () => {
  const tests = slices.map(({ mock, name, Slice }) => ({
    name,
    test: () => {
      const output = TestRenderer.create(
        <Slice onPress={() => {}} slice={mock} />
      );

      expect(output).toMatchSnapshot();
    }
  }));

  iterator(tests);
};
