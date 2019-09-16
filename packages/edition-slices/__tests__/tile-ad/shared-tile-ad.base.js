import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAD } from "../../src/tiles";

export default () => {
  describe("tile ad", () => {
    it("without breakpoint", () => {
      testTile(TileAD);
    });
  });
};
