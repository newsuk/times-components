import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";

import {
  TileA,
  TileB,
  TileC,
  TileD,
  TileE,
  TileF,
  TileG,
  TileH,
  TileI,
  TileJ,
  TileL,
  TileM,
  TileN,
  TileO,
  TileP,
  TileQ,
  TileR,
  TileT,
  TileU
} from "../src/tiles";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");

const tile = mockEditionSlice(1).items[0];

const testTile = Tile => {
  const output = TestRenderer.create(<Tile onPress={() => {}} tile={tile} />);
  expect(output).toMatchSnapshot();
};

export default () => {
  const tests = [
    {
      name: "tile a",
      test: () => testTile(TileA)
    },
    {
      name: "tile b",
      test: () => testTile(TileB)
    },
    {
      name: "tile c",
      test: () => testTile(TileC)
    },
    {
      name: "tile d",
      test: () => testTile(TileD)
    },
    {
      name: "tile e",
      test: () => testTile(TileE)
    },
    {
      name: "tile f",
      test: () => testTile(TileF)
    },
    {
      name: "tile g",
      test: () => testTile(TileG)
    },
    {
      name: "tile h",
      test: () => testTile(TileH)
    },
    {
      name: "tile i",
      test: () => testTile(TileI)
    },
    {
      name: "tile j",
      test: () => testTile(TileJ)
    },
    {
      name: "tile l",
      test: () => testTile(TileL)
    },
    {
      name: "tile m",
      test: () => testTile(TileM)
    },
    {
      name: "tile n",
      test: () => testTile(TileN)
    },
    {
      name: "tile o",
      test: () => testTile(TileO)
    },
    {
      name: "tile p",
      test: () => testTile(TileP)
    },
    {
      name: "tile q",
      test: () => testTile(TileQ)
    },
    {
      name: "tile r",
      test: () => testTile(TileR)
    },
    {
      name: "tile t",
      test: () => testTile(TileT)
    },
    {
      name: "tile U",
      test: () => testTile(TileU)
    }
  ];

  iterator(tests);
};
