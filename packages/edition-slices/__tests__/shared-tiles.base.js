import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadOneFullWidthSlice,
  mockSecondaryTwoNoPicAndTwoSlice
} from "@times-components/fixture-generator";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";

import {
  TileA,
  TileB,
  TileC,
  TileD,
  TileE,
  TileF,
  TileG,
  TileI,
  TileJ,
  TileL,
  TileM,
  TileN,
  TileO
} from "../src/tiles";

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
      name: "tile a",
      test: () => {
        const output = TestRenderer.create(
          <TileA onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile b",
      test: () => {
        const output = TestRenderer.create(
          <TileB onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile c",
      test: () => {
        const output = TestRenderer.create(
          <TileC onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile d",
      test: () => {
        const output = TestRenderer.create(
          <TileD onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile e",
      test: () => {
        const output = TestRenderer.create(
          <TileE onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile f",
      test: () => {
        const slice = mockLeadTwoNoPicAndTwoSlice();
        const output = TestRenderer.create(
          <TileF onPress={() => {}} tile={slice.lead1} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile g",
      test: () => {
        const secondaryTwoNoPicAndTwoData = mockSecondaryTwoNoPicAndTwoSlice();
        const output = TestRenderer.create(
          <TileG
            onPress={() => {}}
            tile={secondaryTwoNoPicAndTwoData.support1}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile i",
      test: () => {
        const output = TestRenderer.create(
          <TileI onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile j",
      test: () => {
        const output = TestRenderer.create(
          <TileJ onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile l",
      test: () => {
        const output = TestRenderer.create(
          <TileL onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile m",
      test: () => {
        const output = TestRenderer.create(
          <TileM onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile n",
      test: () => {
        const slice = mockLeadOneFullWidthSlice();
        const output = TestRenderer.create(
          <TileN onPress={() => {}} tile={slice.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile o",
      test: () => {
        const output = TestRenderer.create(
          <TileO onPress={() => {}} tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
