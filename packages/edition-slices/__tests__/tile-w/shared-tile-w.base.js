import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileW } from "../../src/tiles";

export default () => {
  describe("tile w", () => {
    it("medium", () => {
      testTile(TileW, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileW, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileW, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileW);
    });
  });
};
