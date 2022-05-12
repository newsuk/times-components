import React from "react";
import TestRenderer from "react-test-renderer";
import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile, tile } from "../shared-tile-utils";
import { TileO } from "../../src/tiles";

export default () => {
  describe("tile n", () => {
    it("small", () => {
      testTile(TileO, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileO, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileO, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileO, editionBreakpoints.huge);
    });

    it("with default star", () => {
      const output = TestRenderer.create(
        <TileO
          onPress={() => {}}
          tile={tile}
          breakpoint={editionBreakpoints.small}
          isDarkStar={false}
        />
      );
      expect(output).toMatchSnapshot();
    });
  });
};
