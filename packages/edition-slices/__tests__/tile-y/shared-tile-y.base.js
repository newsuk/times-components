import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileY } from "../../src/tiles";

export default () => {
  describe("tile y", () => {
    it("medium", () => {
      testTile(TileY, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileY, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileY, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileY);
    });
  });
};
