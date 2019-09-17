import React from "react";
import TestRenderer from "react-test-renderer";
import "../mocks-tiles";
import Link from "@times-components/link";
import { testPuzzleTile, puzzle } from "../shared-tile-utils";
import { TileAJ } from "../../src/tiles";

export default () => {
  describe("tile aj", () => {
    it("without breakpoint", () => {
      testPuzzleTile(TileAJ);
    });

    it("when pressed calls onPress", () => {
      const fn = jest.fn();

      const output = TestRenderer.create(
        <TileAJ
          id={puzzle.id}
          image={puzzle.image}
          onPress={fn}
          title={puzzle.title}
          url={puzzle.url}
        />
      );

      output.root.findByType(Link).props.onPress();
      expect(fn).toHaveBeenCalled();
    });
  });
};
