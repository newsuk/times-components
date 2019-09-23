import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileC } from "../../src/tiles";

export default () => {
  describe("tile c", () => {
    it("without breakpoint", () => {
      testTile(TileC);
    });
  });
};
