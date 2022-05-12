import React from "react";
import TestRenderer from "react-test-renderer";
import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import Link from "@times-components/link";
import { testPuzzleTile, puzzle } from "../shared-tile-utils";
import { TileAK } from "../../src/tiles";

export default () => {
  describe("tile ak", () => {
    it("medium", () => {
      testPuzzleTile(TileAK, editionBreakpoints.medium);
    });

    it("wide", () => {
      testPuzzleTile(TileAK, editionBreakpoints.wide);
    });

    it("huge", () => {
      testPuzzleTile(TileAK, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testPuzzleTile(TileAK);
    });

    it("when pressed calls onPress", () => {
      const fn = jest.fn();

      const output = TestRenderer.create(
        <TileAK
          id={puzzle.id}
          image={puzzle.image}
          onPress={fn}
          title={puzzle.title}
          url={puzzle.url}
          breakpoint={editionBreakpoints.medium}
        />
      );

      output.root.findByType(Link).props.onPress();
      expect(fn).toHaveBeenCalled();
    });
  });
};
