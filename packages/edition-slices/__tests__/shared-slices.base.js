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
  mockSecondaryTwoNoPicAndTwoSlice
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
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");

export default () => {
  const tests = [
    {
      name: "lead one full width slice",
      test: () => {
        const output = TestRenderer.create(
          <LeadOneFullWidthSlice
            onPress={() => {}}
            slice={mockLeadOneFullWidthSlice()}
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
            onPress={() => {}}
            slice={mockLeadOneAndOneSlice()}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one and four slice",
      test: () => {
        const output = TestRenderer.create(
          <LeadOneAndFourSlice
            onPress={() => {}}
            slice={mockLeadOneAndFourSlice()}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Lead Two No Pic And Two",
      test: () => {
        const output = TestRenderer.create(
          <LeadTwoNoPicAndTwoSlice
            onPress={() => {}}
            slice={mockLeadTwoNoPicAndTwoSlice()}
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
            slice={mockSecondaryOneSlice()}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Secondary Four",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryFourSlice
            onPress={() => {}}
            slice={mockSecondaryFourSlice()}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Secondary Two And Two",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryTwoAndTwoSlice
            onPress={() => {}}
            slice={mockSecondaryTwoAndTwoSlice()}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Secondary Two No Pic And Two",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryTwoNoPicAndTwoSlice
            onPress={() => {}}
            slice={mockSecondaryTwoNoPicAndTwoSlice()}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "List Two And Six No Pic",
      test: () => {
        const output = TestRenderer.create(
          <ListTwoAndSixNoPicSlice
            onPress={() => {}}
            slice={mockListTwoAndSixNoPicSlice()}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "Leaders",
      test: () => {
        const output = TestRenderer.create(
          <LeadersSlice onPress={() => {}} slice={mockLeadersSlice()} />
        );
        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
