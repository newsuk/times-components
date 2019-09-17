import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAB } from "../../src/tiles";

export default () => {
  describe("tile ab", () => {
    it("medium", () => {
      testTile(TileAB, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAB, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAB, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileAB);
    });
  });
};
