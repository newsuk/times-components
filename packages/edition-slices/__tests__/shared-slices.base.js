import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  mockSecondaryFourSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockList2AndSixNoPicSlice
} from "@times-components/fixture-generator";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import {
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  ListTwoAndSixNoPicSlice,
  LeadOneFullWidthSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoNoPicAndTwoSlice
} from "../src/slices";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
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
          <LeadOneFullWidthSlice
            lead={leadOneAndOneData.lead}
            onPress={() => {}}
          />
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
            onPress={() => {}}
            support={leadOneAndOneData.support}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one and four slice",
      test: () => {
        const listTwoAndSixNoPic = mockList2AndSixNoPicSlice();
        const output = TestRenderer.create(
          <LeadOneAndFourSlice
            lead={listTwoAndSixNoPic.lead1}
            onPress={() => {}}
            support1={listTwoAndSixNoPic.support1}
            support2={listTwoAndSixNoPic.support2}
            support3={listTwoAndSixNoPic.support3}
            support4={listTwoAndSixNoPic.support4}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary one slice",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryOneSlice
            onPress={() => {}}
            secondary={leadOneAndOneData.lead}
          />
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
            onPress={() => {}}
            secondary1={secondaryFourData.secondary1}
            secondary2={secondaryFourData.secondary2}
            secondary3={secondaryFourData.secondary3}
            secondary4={secondaryFourData.secondary4}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Secondary Two No Pic And Two",
      test: () => {
        const secondaryTwoNoPicAndTwoData = mockSecondaryTwoNoPicAndTwoSlice();
        const output = TestRenderer.create(
          <SecondaryTwoNoPicAndTwoSlice
            secondary1={secondaryTwoNoPicAndTwoData.secondary1}
            secondary2={secondaryTwoNoPicAndTwoData.secondary2}
            support1={secondaryTwoNoPicAndTwoData.support1}
            support2={secondaryTwoNoPicAndTwoData.support2}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "List Two And Six No Pic",
      test: () => {
        const listTwoAndSixNoPic = mockList2AndSixNoPicSlice();
        const output = TestRenderer.create(
          <ListTwoAndSixNoPicSlice
            lead1={listTwoAndSixNoPic.lead1}
            lead2={listTwoAndSixNoPic.lead2}
            onPress={() => {}}
            support1={listTwoAndSixNoPic.support1}
            support2={listTwoAndSixNoPic.support2}
            support3={listTwoAndSixNoPic.support3}
            support4={listTwoAndSixNoPic.support4}
            support5={listTwoAndSixNoPic.support5}
            support6={listTwoAndSixNoPic.support6}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
