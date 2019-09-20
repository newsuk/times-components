import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAN } from "../../src/tiles";

export default () => {
  describe("tile an", () => {
    it("without breakpoint", () => {
      testTile(TileAN);
    });
  });
};
