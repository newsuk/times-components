import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAF } from "../../src/tiles";

export default () => {
  describe("tile af", () => {
    it("without breakpoint", () => {
      testTile(TileAF);
    });
  });
};
