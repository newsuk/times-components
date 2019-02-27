import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";

import { TileG, TileP } from "../src/tiles";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");

const tile = mockEditionSlice(1).items[0];

const getLayoutEventForWidth = width => ({
  nativeEvent: { layout: { width } }
});

const layoutChange = (Tile, mockTile = tile) => {
  const output = TestRenderer.create(
    <Tile onPress={() => {}} tile={mockTile} />
  );

  output.root.findByType(View).props.onLayout(getLayoutEventForWidth(700));

  expect(output).toMatchSnapshot();
};

export default () => {
  const tests = [
    {
      name: "tile g - layout change",
      test: () => layoutChange(TileG)
    },
    {
      name: "tile p - layout change",
      test: () => layoutChange(TileP)
    }
  ];

  iterator(tests);
};
