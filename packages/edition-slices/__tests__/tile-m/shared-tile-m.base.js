import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileM } from "../../src/tiles";

export default () => {
  describe("tile m", () => {
    it("small", () => {
      testTile(TileM, editionBreakpoints.small);
    });

    it("medium", () => {
      testTile(TileM, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileM, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileM, editionBreakpoints.huge);
    });

    it("without breakpoint should be like small", () => {
      testTile(TileM);
    });
  });
};
