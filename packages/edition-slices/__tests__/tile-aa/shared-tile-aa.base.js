import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAA } from "../../src/tiles";

export default () => {
  describe("tile aа", () => {
    it("medium", () => {
      testTile(TileAA, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileAA, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileAA, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileAA);
    });
  });
};
