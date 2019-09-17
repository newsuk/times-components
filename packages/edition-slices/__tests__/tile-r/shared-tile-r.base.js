import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileR } from "../../src/tiles";

export default () => {
  describe("tile r", () => {
    it("medium", () => {
      testTile(TileR, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileR, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileR, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileR);
    });
  });
};
