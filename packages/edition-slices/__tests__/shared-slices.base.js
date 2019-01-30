import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { mockSecondaryFourSlice } from "@times-components/fixture-generator";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import {
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  SecondaryOneSlice,
  SecondaryFourSlice
} from "../src/slices";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

const leadOneAndOneData = leadOneAndOneDataGenerator({
  imageUrl: "https://img/someImage"
});

export default () => {
  const tests = [
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
    },
    {
      name: "secondary one slice",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryOneSlice secondary={leadOneAndOneData.lead} />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Secondary Four",
      test: () => {
        const secondaryFourData = mockSecondaryFourSlice();
        const output = TestRenderer.create(
          <SecondaryFourSlice
            secondary1={secondaryFourData.secondary1}
            secondary2={secondaryFourData.secondary2}
            secondary3={secondaryFourData.secondary3}
            secondary4={secondaryFourData.secondary4}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
