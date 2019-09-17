import React from "react";
import TestRenderer from "react-test-renderer";
import {
  mockEditionSlice,
  mockDailyRegisterSlice,
  mockPuzzleSlice
} from "@times-components/fixture-generator";

export const tile = mockEditionSlice(1).items[0];
export const dailyRegisterItem = mockDailyRegisterSlice().birthdaysToday;
export const puzzle = mockPuzzleSlice();

export const testTile = (Tile, breakpoint, mockTile = tile) => {
  const output = TestRenderer.create(
    <Tile onPress={() => {}} tile={mockTile} breakpoint={breakpoint} />
  );
  expect(output).toMatchSnapshot();
};

export const testPuzzleTile = (Tile, breakpoint) => {
  const output = TestRenderer.create(
    <Tile
      id={puzzle.id}
      image={puzzle.image}
      onPress={() => {}}
      title={puzzle.title}
      url={puzzle.url}
      breakpoint={breakpoint}
    />
  );
  expect(output).toMatchSnapshot();
};
