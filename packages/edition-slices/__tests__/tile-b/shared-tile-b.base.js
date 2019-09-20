import React from "react";
import TestRenderer from "react-test-renderer";
import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile, tile } from "../shared-tile-utils";
import { TileB } from "../../src/tiles";

export default () => {
  describe("tile b", () => {
    it("small", () => {
      testTile(TileB, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileB, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileB, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileB, editionBreakpoints.huge);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileB);
    });

    it("with more teaser", () => {
      const output = TestRenderer.create(
        <TileB
          onPress={() => {}}
          tile={tile}
          breakpoint={editionBreakpoints.medium}
          withMoreTeaser
        />
      );
      expect(output).toMatchSnapshot();
    });
  });
};
