import "../mocks-tiles";
import { testTile } from "../shared-tile-utils";
import { TileAM } from "../../src/tiles";

export default () => {
  describe("tile am", () => {
    it("without breakpoint", () => {
      testTile(TileAM);
    });
  });
};
