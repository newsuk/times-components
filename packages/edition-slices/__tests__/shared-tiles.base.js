import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  mockEditionSlice,
  mockDailyRegisterSlice,
  mockPuzzleSlice
} from "@times-components/fixture-generator";

import {
  TileA,
  TileAE,
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
  TileS,
  TileT,
  TileU,
  TileV,
  TileW,
  TileX,
  TileY,
  TileZ,
  TileAA,
  TileAB,
  TileAG,
  TileAJ,
  TileAK
} from "../src/tiles";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");

const tile = mockEditionSlice(1).items[0];
const dailyRegisterItem = mockDailyRegisterSlice().birthdaysToday;

const testTile = (Tile, mockTile = tile) => {
  const output = TestRenderer.create(
    <Tile onPress={() => {}} tile={mockTile} />
  );
  expect(output).toMatchSnapshot();
};

const testPuzzleTile = Tile => {
  const puzzle = mockPuzzleSlice();
  const output = TestRenderer.create(
    <Tile
      id={puzzle.id}
      image={puzzle.image}
      onPress={() => {}}
      title={puzzle.title}
      url={puzzle.url}
    />
  );
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
      name: "tile s",
      test: () => testTile(TileS, dailyRegisterItem)
    },
    {
      name: "tile t",
      test: () => testTile(TileT)
    },
    {
      name: "tile U",
      test: () => testTile(TileU)
    },
    {
      name: "tile v",
      test: () => testTile(TileV)
    },
    {
      name: "tile w",
      test: () => testTile(TileW)
    },
    {
      name: "tile x",
      test: () => testTile(TileX)
    },
    {
      name: "tile y",
      test: () => testTile(TileY)
    },
    {
      name: "tile z",
      test: () => testTile(TileZ)
    },
    {
      name: "tile aa",
      test: () => testTile(TileAA)
    },
    {
      name: "tile ab",
      test: () => testTile(TileAB)
    },
    {
      name: "tile ae",
      test: () => testTile(TileAE)
    },
    {
      name: "tile ag",
      test: () => testTile(TileAG)
    },
    {
      name: "tile aj",
      test: () => testPuzzleTile(TileAJ)
    },
    {
      name: "tile ak",
      test: () => testPuzzleTile(TileAK)
    }
  ];

  iterator(tests);
};
