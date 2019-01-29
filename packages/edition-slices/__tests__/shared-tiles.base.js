import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import { PrimaryTile, SecondaryTile } from "../src/tiles";

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
      name: "primary tile",
      test: () => {
        const output = TestRenderer.create(
          <PrimaryTile tile={leadOneAndOneData.lead} withImage />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "primary tile without image",
      test: () => {
        const output = TestRenderer.create(
          <PrimaryTile tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary tile",
      test: () => {
        const output = TestRenderer.create(
          <SecondaryTile tile={leadOneAndOneData.lead} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
