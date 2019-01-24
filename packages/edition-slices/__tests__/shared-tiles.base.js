import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import leadOneAndOneDataGenerator from "../fixtures/leadoneandone";
import { PrimaryTile } from "../src/tiles";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

// eslint-disable-next-line global-require
jest.mock("@times-components/svgs", () => require("./mock-svg"));

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
    }
  ];

  iterator(tests);
};
