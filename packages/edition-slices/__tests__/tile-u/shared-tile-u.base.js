import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileU } from "../../src/tiles";

export default () => {
  describe("tile u", () => {
    it("medium", () => {
      testTile(TileU, editionBreakpoints.medium);
    });

    it("wide", () => {
      testTile(TileU, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileU, editionBreakpoints.huge);
    });

    it("without breakpoint should be like medium", () => {
      testTile(TileU);
    });
  });
};
