import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileZ } from "../../src/tiles";

export default () => {
  describe("tile z", () => {
    it("wide", () => {
      testTile(TileZ, editionBreakpoints.wide);
    });

    it("huge", () => {
      testTile(TileZ, editionBreakpoints.huge);
    });

    it("without breakpoint should be like wide", () => {
      testTile(TileZ);
    });
  });
};
