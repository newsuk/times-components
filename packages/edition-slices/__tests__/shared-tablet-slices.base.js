import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { setDimension } from "@times-components/test-utils/dimensions";
import { mockLeadOneFullWidthSlice } from "@times-components/fixture-generator";
import Responsive from "@times-components/responsive";
import "./mocks";
import { LeadOneFullWidthSlice } from "../src/slices";

const slices = [
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "lead one full width tablet slice",
    Slice: LeadOneFullWidthSlice
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
