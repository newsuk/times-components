import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { testTile } from "../shared-tile-utils";
import { TileE } from "../../src/tiles";

export default () => {
  describe("tile e", () => {
    it("small", () => {
      testTile(TileE, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileE, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileE, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileE, editionBreakpoints.huge);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileE);
    });
  });
};
