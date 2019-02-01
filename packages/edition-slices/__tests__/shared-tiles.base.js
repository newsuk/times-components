import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import { TileA, TileB, TileC } from "../src/tiles";

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
      name: "tile a",
      test: () => {
        const output = TestRenderer.create(
          <TileA tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile b",
      test: () => {
        const output = TestRenderer.create(
          <TileB tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tile c",
      test: () => {
        const output = TestRenderer.create(
          <TileC tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
