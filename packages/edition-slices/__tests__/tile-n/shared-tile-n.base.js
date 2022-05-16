import React from "react";
import TestRenderer from "react-test-renderer";
import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile, tile } from "../shared-tile-utils";
import { TileN } from "../../src/tiles";

export default () => {
  describe("tile n", () => {
    it("small", () => {
      testTile(TileN, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileN, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileN, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileN, editionBreakpoints.huge);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileN);
    });

    it("with default star", () => {
      const output = TestRenderer.create(
        <TileN
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
