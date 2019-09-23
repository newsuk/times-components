import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileQ } from "../../src/tiles";

export default () => {
  describe("tile q", () => {
    it("without breakpoint", () => {
      testTile(TileQ);
    });
  });
};
