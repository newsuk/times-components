import "../mocks-tiles";
import { editionBreakpoints } from "@times-components/styleguide";
import { testTile } from "../shared-tile-utils";
import { TileAL } from "../../src/tiles";

export default () => {
  describe("tile al", () => {
    it("wide", () => {
      testTile(TileAL, editionBreakpoints.wide);
    });
    it("huge", () => {
      testTile(TileAL, editionBreakpoints.huge);
    });
  });
};
