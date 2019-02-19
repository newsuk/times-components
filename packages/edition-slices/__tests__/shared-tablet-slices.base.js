import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { setDimension } from "@times-components/test-utils/dimensions";
import {
  mockLeadOneAndOneSlice,
  mockLeadOneFullWidthSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import "./mocks";
import {
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  SecondaryFourSlice
} from "../src/slices";

const slices = [
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
    mock: mockSecondaryFourSlice(),
    name: "secondary four tablet slice",
    Slice: SecondaryFourSlice
  }
];

export default () => {
  const tests = slices.map(({ mock, name, Slice }) => ({
    name,
    test: () => {
      setDimension(1000);
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
