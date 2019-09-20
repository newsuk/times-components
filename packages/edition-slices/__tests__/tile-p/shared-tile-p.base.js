import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileP } from "../../src/tiles";

export default () => {
  describe("tile p", () => {
    it("without breakpoint", () => {
      testTile(TileP);
    });
  });
};
