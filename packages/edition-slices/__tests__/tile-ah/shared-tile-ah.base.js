import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAH } from "../../src/tiles";

export default () => {
  describe("tile ah", () => {
    it("medium", () => {
      testTile(TileAH, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAH, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAH, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileAH);
    });
  });
};
