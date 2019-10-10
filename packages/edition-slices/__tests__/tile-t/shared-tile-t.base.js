import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileT } from "../../src/tiles";

export default () => {
  describe("tile t", () => {
    it("without breakpoint", () => {
      testTile(TileT);
    });
  });
};
