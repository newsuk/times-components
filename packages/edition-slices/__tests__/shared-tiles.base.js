import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import { TileA, TileB, TileC, TileD, TileE } from "../src/tiles";

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
    }
  ];

  iterator(tests);
};
