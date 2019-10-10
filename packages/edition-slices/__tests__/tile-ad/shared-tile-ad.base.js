import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAD } from "../../src/tiles";

export default () => {
  describe("tile ad", () => {
    it("medium", () => {
      testTile(TileAD, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAD, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAD, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileAD);
    });
  });
};
