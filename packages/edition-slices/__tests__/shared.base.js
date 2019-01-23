import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import { PrimaryTile } from "../src/tiles";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "../src/slices";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

const leadOneAndOneData = leadOneAndOneDataGenerator({
  imageUrl: "https://img/someImage"
});

export default () => {
  const tests = [
    {
      name: "primary tile",
      test: () => {
        const output = TestRenderer.create(
          <PrimaryTile tile={leadOneAndOneData.lead} withImage />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "primary tiles without image",
      test: () => {
        const output = TestRenderer.create(
          <PrimaryTile tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one full width slice",
      test: () => {
        const output = TestRenderer.create(
          <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one and one slice",
      test: () => {
        const output = TestRenderer.create(
          <LeadOneAndOneSlice
            lead={leadOneAndOneData.lead}
            support={leadOneAndOneData.support}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
