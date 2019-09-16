import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testPuzzleTile } from "../shared-tile-utils";
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
  });
};
