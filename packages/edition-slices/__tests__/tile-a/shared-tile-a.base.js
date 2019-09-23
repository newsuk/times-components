import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileA } from "../../src/tiles";

export default () => {
  describe("tile a", () => {
    it("without breakpoint", () => {
      testTile(TileA);
    });
  });
};
